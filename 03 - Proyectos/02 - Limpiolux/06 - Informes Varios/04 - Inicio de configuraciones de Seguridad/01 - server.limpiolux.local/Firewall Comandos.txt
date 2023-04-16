sc config MpsSvc start= auto
net start MpsSvc
netsh advfirewall set allprofiles state off
netsh advfirewall set publicprofile state on
