<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Enquiry – EduStar Academy</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0ede6; color: #1a1a12; }
    .wrap { max-width: 600px; margin: 30px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(10,74,58,.15); }

    /* Header */
    .header { background: linear-gradient(135deg, #0a4a3a 0%, #0d6b54 100%); padding: 36px 40px; text-align: center; }
    .logo { font-size: 2.2rem; margin-bottom: 6px; }
    .header h1 { color: #ffffff; font-size: 1.5rem; font-weight: 700; letter-spacing: -.01em; }
    .header p { color: rgba(255,255,255,.7); font-size: .88rem; margin-top: 4px; }

    /* Alert bar */
    .alert-bar { background: #e8a020; padding: 12px 40px; text-align: center; font-size: .88rem; font-weight: 700; color: #3d2200; }

    /* Body */
    .body { background: #ffffff; padding: 36px 40px; }
    .greeting { font-size: 1.05rem; color: #0a4a3a; font-weight: 600; margin-bottom: 8px; }
    .intro { color: #6b7060; font-size: .92rem; line-height: 1.7; margin-bottom: 28px; }

    /* Details table */
    .section-title { font-size: .78rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #0d6b54; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e8a020; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    .detail-table tr { border-bottom: 1px solid #f0ede6; }
    .detail-table tr:last-child { border-bottom: none; }
    .detail-table td { padding: 11px 14px; font-size: .9rem; vertical-align: top; }
    .detail-table td:first-child { width: 38%; color: #6b7060; font-weight: 600; font-size: .84rem; background: #f9f7f3; border-radius: 4px; }
    .detail-table td:last-child { color: #1a1a12; font-weight: 500; }

    /* Status badge */
    .badge { display: inline-block; background: rgba(14,107,84,.1); color: #0a4a3a; font-size: .76rem; font-weight: 700; padding: 3px 10px; border-radius: 50px; }

    /* WhatsApp button */
    .btn-wrap { text-align: center; margin: 28px 0; }
    .btn-wa { display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-size: .95rem; font-weight: 700; letter-spacing: .01em; }
    .btn-wa-sub { font-size: .8rem; color: #6b7060; margin-top: 8px; }

    /* Action steps */
    .steps { background: #f9f7f3; border-radius: 10px; padding: 20px 24px; margin-bottom: 28px; }
    .steps-title { font-size: .82rem; font-weight: 700; color: #0a4a3a; margin-bottom: 14px; }
    .step { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 10px; font-size: .87rem; color: #3d4030; line-height: 1.5; }
    .step-num { min-width: 22px; height: 22px; background: #0a4a3a; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .72rem; font-weight: 700; flex-shrink: 0; }

    /* Footer */
    .footer { background: #0a4a3a; padding: 24px 40px; text-align: center; }
    .footer p { color: rgba(255,255,255,.5); font-size: .8rem; line-height: 1.7; }
    .footer a { color: #e8a020; }
  </style>
</head>
<body>
<div class="wrap">

  <!-- HEADER -->
  <div class="header">
    <div class="logo">🌟</div>
    <h1>EduStar Academy</h1>
    <p>Admission Enquiry Notification</p>
  </div>

  <!-- ALERT BAR -->
  <div class="alert-bar">
    ⚡ New Enquiry Received — Action Required
  </div>

  <!-- BODY -->
  <div class="body">
    <div class="greeting">Hello Admin,</div>
    <p class="intro">
      A new admission enquiry has been submitted on the EduStar Academy website.
      Please review the details below and follow up with the family as soon as possible.
    </p>

    <!-- STUDENT DETAILS -->
    <div class="section-title">👤 Student Information</div>
    <table class="detail-table">
      <tr><td>Student Name</td><td><strong>{{ $enquiry->student_name }}</strong></td></tr>
      <tr><td>Parent / Guardian</td><td>{{ $enquiry->parent_name ?? 'Not provided' }}</td></tr>
      <tr><td>Grade Interested</td><td><span class="badge">{{ $enquiry->grade }}</span></td></tr>
      <tr><td>Subject / Course</td><td>{{ $enquiry->subject ?? 'Not specified' }}</td></tr>
    </table>

    <!-- CONTACT DETAILS -->
    <div class="section-title">📞 Contact Information</div>
    <table class="detail-table">
      <tr><td>Phone / WhatsApp</td><td><strong>{{ $enquiry->phone }}</strong></td></tr>
      <tr><td>Email</td><td>{{ $enquiry->email ?? 'Not provided' }}</td></tr>
      <tr><td>Submitted At</td><td>{{ $enquiry->created_at->format('d M Y, h:i A') }}</td></tr>
      <tr><td>Enquiry ID</td><td>#{{ str_pad($enquiry->id, 5, '0', STR_PAD_LEFT) }}</td></tr>
    </table>

    @if($enquiry->message)
    <!-- MESSAGE -->
    <div class="section-title">💬 Message from Parent/Student</div>
    <div style="background:#f9f7f3;border-left:3px solid #e8a020;padding:14px 18px;border-radius:6px;font-size:.9rem;color:#3d4030;line-height:1.7;margin-bottom:28px;">
      {{ $enquiry->message }}
    </div>
    @endif

    <!-- WHATSAPP BUTTON -->
    @php
      $waNumber = config('app.admin_whatsapp', '919585949422');
      $waMsg = urlencode(
        "🌟 *EduStar Academy — Following up on Enquiry #" . str_pad($enquiry->id, 5, '0', STR_PAD_LEFT) . "*\n\n" .
        "Hello " . ($enquiry->parent_name ?: $enquiry->student_name) . ",\n\n" .
        "Thank you for your interest in EduStar Academy! We received your enquiry for *" . $enquiry->student_name . "* (Grade: " . $enquiry->grade . ").\n\n" .
        "We would love to schedule a visit or call to discuss admission details. When would be a good time?\n\n" .
        "📞 Call us: +91 " . substr($waNumber, 2) . "\n" .
        "🌟 EduStar Academy, Madurai"
      );
      $studentWaNumber = '91' . ltrim($enquiry->phone, '0');
    @endphp
    <div class="btn-wrap">
      <a class="btn-wa" href="https://wa.me/{{ $studentWaNumber }}?text={{ $waMsg }}">
        💬 Reply on WhatsApp
      </a>
      <p class="btn-wa-sub">Click to open WhatsApp with a pre-typed follow-up message</p>
    </div>

    <!-- ACTION STEPS -->
    <div class="steps">
      <div class="steps-title">✅ Recommended Follow-up Steps</div>
      <div class="step"><div class="step-num">1</div>Click "Reply on WhatsApp" above to contact the family immediately</div>
      <div class="step"><div class="step-num">2</div>Check seat availability for {{ $enquiry->grade }}</div>
      <div class="step"><div class="step-num">3</div>Update enquiry status in the admin panel (contacted / enrolled)</div>
      <div class="step"><div class="step-num">4</div>Schedule a centre visit or call if needed</div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <p>
      This is an automated notification from EduStar Academy website.<br/>
      12, Gandhi Nagar, Madurai – 625 001 |
      <a href="mailto:{{ config('mail.from.address') }}">{{ config('mail.from.address') }}</a>
    </p>
  </div>

</div>
</body>
</html>
