<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Enquiry Received – EduStar Academy</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0ede6; color: #1a1a12; }
    .wrap { max-width: 600px; margin: 30px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(10,74,58,.15); }
    .header { background: linear-gradient(135deg, #0a4a3a 0%, #0d6b54 100%); padding: 36px 40px; text-align: center; }
    .logo { font-size: 2.5rem; margin-bottom: 6px; }
    .header h1 { color: #fff; font-size: 1.6rem; font-weight: 700; }
    .header p { color: rgba(255,255,255,.7); font-size: .88rem; margin-top: 4px; }
    .success-bar { background: #16a34a; color: #fff; padding: 13px 40px; text-align: center; font-size: .9rem; font-weight: 700; }
    .body { background: #fff; padding: 36px 40px; }
    .greeting { font-size: 1.1rem; color: #0a4a3a; font-weight: 600; margin-bottom: 8px; }
    .intro { color: #6b7060; font-size: .92rem; line-height: 1.8; margin-bottom: 26px; }
    .summary { background: #f9f7f3; border-radius: 10px; padding: 20px 24px; margin-bottom: 26px; }
    .summary-title { font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #0d6b54; margin-bottom: 14px; }
    .s-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e8e4dc; font-size: .88rem; }
    .s-row:last-child { border-bottom: none; }
    .s-label { color: #6b7060; }
    .s-val { color: #0a4a3a; font-weight: 600; }
    .what-next { margin-bottom: 26px; }
    .wn-title { font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #0d6b54; margin-bottom: 14px; }
    .wn-step { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; font-size: .88rem; color: #3d4030; line-height: 1.6; }
    .wn-icon { font-size: 1.1rem; flex-shrink: 0; }
    .btn-wa { display: block; background: #25d366; color: #fff; text-decoration: none; padding: 15px; border-radius: 10px; text-align: center; font-size: .95rem; font-weight: 700; margin-bottom: 10px; }
    .btn-call { display: block; background: #0a4a3a; color: #fff; text-decoration: none; padding: 13px; border-radius: 10px; text-align: center; font-size: .9rem; font-weight: 600; }
    .footer { background: #0a4a3a; padding: 24px 40px; text-align: center; }
    .footer p { color: rgba(255,255,255,.5); font-size: .8rem; line-height: 1.7; }
    .footer a { color: #e8a020; }
  </style>
</head>
<body>
<div class="wrap">

  <div class="header">
    <div class="logo">🌟</div>
    <h1>EduStar Academy</h1>
    <p>Enquiry Confirmation</p>
  </div>

  <div class="success-bar">✅ Your Enquiry Has Been Received!</div>

  <div class="body">
    <div class="greeting">Dear {{ $enquiry->parent_name ?: $enquiry->student_name }},</div>
    <p class="intro">
      Thank you for your interest in <strong>EduStar Academy</strong>! We have successfully received your admission enquiry and our team will get back to you within <strong>24 hours</strong>.<br/><br/>
      For an instant reply, click the WhatsApp button below — we typically respond within minutes!
    </p>

    <!-- SUMMARY -->
    <div class="summary">
      <div class="summary-title">📋 Your Enquiry Summary</div>
      <div class="s-row"><span class="s-label">Student Name</span><span class="s-val">{{ $enquiry->student_name }}</span></div>
      <div class="s-row"><span class="s-label">Grade</span><span class="s-val">{{ $enquiry->grade }}</span></div>
      @if($enquiry->subject)
      <div class="s-row"><span class="s-label">Subject</span><span class="s-val">{{ $enquiry->subject }}</span></div>
      @endif
      <div class="s-row"><span class="s-label">Enquiry ID</span><span class="s-val">#{{ str_pad($enquiry->id, 5, '0', STR_PAD_LEFT) }}</span></div>
      <div class="s-row"><span class="s-label">Submitted</span><span class="s-val">{{ $enquiry->created_at->format('d M Y, h:i A') }}</span></div>
    </div>

    <!-- WHAT NEXT -->
    <div class="what-next">
      <div class="wn-title">What Happens Next?</div>
      <div class="wn-step"><div class="wn-icon">📞</div>Our team will call you within 24 hours to discuss admission details and seat availability.</div>
      <div class="wn-step"><div class="wn-icon">💬</div>You can also message us instantly on WhatsApp using the button below.</div>
      <div class="wn-step"><div class="wn-icon">🏫</div>We will schedule a free centre visit so you can meet the teachers and see the classroom.</div>
      <div class="wn-step"><div class="wn-icon">📝</div>Once you are happy, we will guide you through the simple admission process.</div>
    </div>

    @php
      $waNumber = config('app.admin_whatsapp', '919585949422');
      $waMsg = urlencode(
        "Hello EduStar Academy! I submitted an enquiry for " . $enquiry->student_name . " (Grade: " . $enquiry->grade . ", Enquiry #" . str_pad($enquiry->id, 5, '0', STR_PAD_LEFT) . "). I would like to know more about admission."
      );
    @endphp

    <a class="btn-wa" href="https://wa.me/{{ $waNumber }}?text={{ $waMsg }}">
      💬 Chat with Us on WhatsApp
    </a>
    <a class="btn-call" href="tel:+919876543210">
      📞 Call Us: +91 98765 43210
    </a>
  </div>

  <div class="footer">
    <p>
      EduStar Academy | 12, Gandhi Nagar, Madurai – 625 001<br/>
      <a href="mailto:info@edustaracademy.in">info@edustaracademy.in</a> |
      <a href="https://wa.me/{{ config('app.admin_whatsapp') }}">WhatsApp</a>
    </p>
  </div>

</div>
</body>
</html>
