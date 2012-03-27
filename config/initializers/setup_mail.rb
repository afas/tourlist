ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :domain               => "onlina.ru",
  :user_name            => "ai@onlina.ru",
  :password             => "polo13polo13",
  :authentication       => "plain",
  :enable_starttls_auto => true
}
