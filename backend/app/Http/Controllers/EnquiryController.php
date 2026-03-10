<?php
// FILE: app/Http/Controllers/EnquiryController.php
// FULL VERSION — Save to DB + Email Admin + Email Student + Return WhatsApp URL

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enquiry;
use App\Mail\EnquiryMail;
use App\Mail\EnquiryConfirmationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EnquiryController extends Controller
{
    public function store(Request $request)
    {
        $v = Validator::make($request->all(), [
            'student_name' => 'required|string|max:150',
            'parent_name'  => 'nullable|string|max:150',
            'phone'        => 'required|string|regex:/^[6-9]\d{9}$/',
            'email'        => 'nullable|email|max:200',
            'grade'        => 'required|string|max:50',
            'subject'      => 'nullable|string|max:100',
            'message'      => 'nullable|string|max:1000',
        ]);

        if ($v->fails()) {
            return response()->json(['success' => false, 'errors' => $v->errors()], 422);
        }

        // 1. Save to MySQL
        $enquiry = Enquiry::create([
            'student_name' => $request->student_name,
            'parent_name'  => $request->parent_name,
            'phone'        => $request->phone,
            'email'        => $request->email,
            'grade'        => $request->grade,
            'subject'      => $request->subject,
            'message'      => $request->message,
            'status'       => 'new',
            'ip_address'   => $request->ip(),
        ]);

        // 2. Email admin
        try {
            Mail::to(env('ADMIN_EMAIL', 'admin@edustaracademy.in'))
                ->send(new EnquiryMail($enquiry));
        } catch (\Exception $e) {
            Log::error('Admin email failed: ' . $e->getMessage());
        }

        // 3. Email student/parent if email was provided
        if ($enquiry->email) {
            try {
                Mail::to($enquiry->email)->send(new EnquiryConfirmationMail($enquiry));
            } catch (\Exception $e) {
                Log::error('Student email failed: ' . $e->getMessage());
            }
        }

        // 4. Build WhatsApp URL for frontend redirect
        $wa = config('app.admin_whatsapp', '919585949422');
        $msg = urlencode(
            "🌟 *New Enquiry — EduStar Academy*\n\n" .
            "👤 *Student:* {$enquiry->student_name}\n" .
            "👨‍👩‍👦 *Parent:* " . ($enquiry->parent_name ?? 'N/A') . "\n" .
            "📞 *Phone:* {$enquiry->phone}\n" .
            "📧 *Email:* " . ($enquiry->email ?? 'N/A') . "\n" .
            "📚 *Grade:* {$enquiry->grade}\n" .
            "📖 *Subject:* " . ($enquiry->subject ?? 'N/A') . "\n" .
            "💬 *Message:* " . ($enquiry->message ?? 'No message') . "\n" .
            "🔢 *ID:* #" . str_pad($enquiry->id, 5, '0', STR_PAD_LEFT) . "\n" .
            "🕐 " . now()->format('d M Y, h:i A') . "\n\n" .
            "_Sent via EduStar Academy Website_"
        );

        return response()->json([
            'success'      => true,
            'message'      => 'Enquiry submitted successfully! Email sent.',
            'enquiry_id'   => $enquiry->id,
            'whatsapp_url' => "https://wa.me/{$wa}?text={$msg}",
        ], 201);
    }

    public function index(Request $request)
    {
        $q = Enquiry::orderBy('created_at', 'desc');
        if ($request->status) $q->where('status', $request->status);
        if ($request->grade)  $q->where('grade',  $request->grade);
        return response()->json($q->paginate(20));
    }

    public function updateStatus(Request $request, Enquiry $enquiry)
    {
        $request->validate(['status' => 'required|in:new,contacted,enrolled,closed']);
        $enquiry->update(['status' => $request->status]);
        return response()->json(['success' => true, 'enquiry' => $enquiry]);
    }
}
