import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast from '../components/Toast';
import ErrorBanner from '../components/ErrorBanner';
import ChangeAvatarDialog from '../components/ChangeAvatarDialog';

const demoProfile = {
  fullName: "John Doe",
  email: "john@example.com",
  contactNumber: "+1 234 567 8900",
  address: "123 Main St, City, Country",
  avatar: null,
  role: "Administrator",
  joinDate: "August 15, 2025",
  lastLogin: "May 3, 2026, 9:45 AM"
};

const Profile = () => {
  const [profile, setProfile] = useState(demoProfile);
  const [formData, setFormData] = useState({ ...demoProfile });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [errorSim, setErrorSim] = useState(false);
  const [errors, setErrors] = useState({});

  // Detect unsaved changes
  const hasChanges = useMemo(() => {
    return (
      formData.fullName !== profile.fullName ||
      formData.contactNumber !== profile.contactNumber ||
      formData.address !== profile.address
    );
  }, [formData, profile]);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateProfile = () => {
    const newErrors = {};
    if (formData.fullName.trim().length < 2) newErrors.fullName = "Name must be at least 2 characters";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Please enter a valid phone number";
    if (formData.address.trim().length < 5) newErrors.address = "Address must be at least 5 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) return;
    
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (errorSim) {
      showToast("Failed to update profile. Please try again.", "error");
      setSaving(false);
      return;
    }

    setProfile({ ...formData });
    setSaving(false);
    showToast("Profile updated successfully");
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setErrors({});
  };

  const handleAvatarChange = (newAvatar) => {
    setProfile(prev => ({ ...prev, avatar: newAvatar }));
    setFormData(prev => ({ ...prev, avatar: newAvatar }));
    showToast("Avatar updated successfully");
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: passwordData.new.length >= 8 },
    { label: "At least 1 uppercase letter", met: /[A-Z]/.test(passwordData.new) },
    { label: "At least 1 number", met: /[0-9]/.test(passwordData.new) },
    { label: "At least 1 special character", met: /[^A-Za-z0-9]/.test(passwordData.new) }
  ];

  const handleUpdatePassword = async () => {
    const allMet = passwordRequirements.every(req => req.met);
    if (!allMet || passwordData.new !== passwordData.confirm || !passwordData.current) {
      return;
    }

    setChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (errorSim) {
      showToast("Failed to change password. Try again.", "error");
      setChangingPassword(false);
      return;
    }

    setPasswordData({ current: '', new: '', confirm: '' });
    setChangingPassword(false);
    showToast("Password changed successfully");
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <Sidebar />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-[28px] font-extrabold text-text-primary tracking-tight">Profile</h1>
              <p className="text-text-secondary mt-1 font-medium">Manage your account settings</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-soft-lavender border border-border-color">
              <span className="text-xs font-bold text-text-secondary uppercase">Error Simulation</span>
              <button 
                onClick={() => setErrorSim(!errorSim)}
                className={`w-10 h-5 rounded-full transition-colors relative ${errorSim ? 'bg-primary' : 'bg-[#E5E0EB]'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${errorSim ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* SECTION 1: PROFILE HEADER CARD */}
            <Card className="p-8 flex flex-col items-center text-center shadow-soft-lavender border border-border-color">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center border-[3px] border-white shadow-xl overflow-hidden">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-primary">{getInitials(profile.fullName)}</span>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => setIsAvatarDialogOpen(true)}
                className="mt-4 px-5 py-2 border border-[#D1CFD6] text-text-secondary rounded-lg text-[13px] font-medium hover:bg-[#F5F3F8] hover:border-primary hover:text-primary transition-all"
              >
                Change Avatar
              </button>

              <h2 className="text-2xl font-bold text-text-primary mt-4 tracking-tight">{profile.fullName}</h2>
              <p className="text-sm text-text-secondary mt-1">{profile.email}</p>
              
              <div className="mt-2 bg-secondary/15 text-secondary px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                {profile.role}
              </div>

              <div className="flex items-center gap-8 mt-8 py-4 border-t border-[#F0EDF5] w-full justify-center">
                <div className="text-center">
                  <p className="text-[11px] text-text-secondary font-bold uppercase tracking-widest">Flights Managed</p>
                  <p className="text-lg font-bold text-text-primary">48</p>
                </div>
                <div className="w-1 h-1 bg-[#D1CFD6] rounded-full" />
                <div className="text-center">
                  <p className="text-[11px] text-text-secondary font-bold uppercase tracking-widest">Users Managed</p>
                  <p className="text-lg font-bold text-text-primary">856</p>
                </div>
                <div className="w-1 h-1 bg-[#D1CFD6] rounded-full" />
                <div className="text-center">
                  <p className="text-[11px] text-text-secondary font-bold uppercase tracking-widest">Revenue</p>
                  <p className="text-lg font-bold text-text-primary">$284K</p>
                </div>
              </div>
            </Card>

            {/* SECTION 2: PERSONAL INFORMATION CARD */}
            <Card className="p-8 shadow-soft-lavender border border-border-color">
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#F0EDF5]">
                <div>
                  <h3 className="text-lg font-bold text-text-primary">Personal Information</h3>
                  <p className="text-[13px] text-text-secondary">Update your personal details</p>
                </div>
                {hasChanges && (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-[#F5A623]">Unsaved changes</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-primary">Full Name</label>
                  <Input 
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    error={errors.fullName}
                    className="h-11"
                  />
                  {errors.fullName && <p className="text-[11px] text-[#D9534F] font-medium">{errors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-primary">Email</label>
                  <div className="relative">
                    <Input 
                      value={formData.email}
                      disabled
                      className="bg-[#F5F3F8] cursor-not-allowed pr-10 h-11"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary opacity-50">
                      🔒
                    </div>
                  </div>
                  <p className="text-[11px] text-text-secondary italic">Email cannot be changed</p>
                </div>

                <div className="space-y-1.5 md:col-span-1">
                  <label className="text-sm font-semibold text-text-primary">Contact Number</label>
                  <Input 
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    error={errors.contactNumber}
                    className="h-11"
                  />
                  {errors.contactNumber && <p className="text-[11px] text-[#D9534F] font-medium">{errors.contactNumber}</p>}
                </div>

                <div className="space-y-1.5 md:col-span-1">
                  <label className="text-sm font-semibold text-text-primary">Address</label>
                  <Input 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    error={errors.address}
                    className="h-11"
                  />
                  {errors.address && <p className="text-[11px] text-[#D9534F] font-medium">{errors.address}</p>}
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 mt-4 border-t border-[#F0EDF5]">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Role</label>
                    <Input value={profile.role} disabled className="bg-[#F5F3F8] h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Member Since</label>
                    <Input value={profile.joinDate} disabled className="bg-[#F5F3F8] h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Last Login</label>
                    <Input value={profile.lastLogin} disabled className="bg-[#F5F3F8] h-10 text-sm" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                {hasChanges && (
                  <Button 
                    variant="text" 
                    className="px-6 h-11 border border-[#D1CFD6] rounded-xl text-text-secondary hover:bg-[#F5F3F8]"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  className={`px-8 h-11 rounded-xl font-bold transition-all ${
                    !hasChanges ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                  }`}
                  onClick={handleSaveProfile}
                  disabled={!hasChanges || saving}
                >
                  {saving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : "Save Changes"}
                </Button>
              </div>
            </Card>

            {/* SECTION 3: CHANGE PASSWORD */}
            <Card className="p-8 shadow-soft-lavender border border-border-color">
              <div className="pb-4 mb-6 border-b border-[#F0EDF5]">
                <h3 className="text-lg font-bold text-text-primary">Change Password</h3>
                <p className="text-[13px] text-text-secondary">Update your account password</p>
              </div>

              <div className="space-y-6 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-primary">Current Password</label>
                  <Input 
                    type="password"
                    placeholder="Enter current password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-primary">New Password</label>
                  <Input 
                    type="password"
                    placeholder="Enter new password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {passwordRequirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-[#4CAF50]' : 'bg-[#E5E0EB]'}`}>
                          {req.met && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-[11px] font-medium ${req.met ? 'text-[#4CAF50]' : 'text-text-secondary'}`}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-text-primary">Confirm New Password</label>
                  <Input 
                    type="password"
                    placeholder="Confirm new password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    error={passwordData.new && passwordData.confirm && passwordData.new !== passwordData.confirm}
                  />
                  {passwordData.new && passwordData.confirm && passwordData.new !== passwordData.confirm && (
                    <p className="text-[11px] text-[#D9534F] font-medium">Passwords do not match</p>
                  )}
                </div>

                <Button 
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold mt-2 disabled:opacity-50"
                  onClick={handleUpdatePassword}
                  disabled={changingPassword || !passwordData.current || !passwordData.new || !passwordData.confirm || passwordData.new !== passwordData.confirm || !passwordRequirements.every(r => r.met)}
                >
                  {changingPassword ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : "Update Password"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Change Avatar Dialog */}
      <ChangeAvatarDialog 
        isOpen={isAvatarDialogOpen}
        onClose={() => setIsAvatarDialogOpen(false)}
        onAvatarChange={handleAvatarChange}
        hasAvatar={!!profile.avatar}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default Profile;
