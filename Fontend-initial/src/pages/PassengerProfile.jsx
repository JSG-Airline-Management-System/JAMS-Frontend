import React, { useState, useEffect, useMemo } from 'react';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast from '../components/Toast';
import Modal from '../components/Modal';

const demoProfile = {
  fullName: "John Doe",
  email: "john@example.com",
  contactNumber: "+1 234 567 8900",
  address: "123 Main St, City, Country",
  avatar: null,
  memberSince: "August 15, 2025",
  totalFlights: 5,
  totalBookings: 12,
  milesFlown: 28450,
  loyaltyTier: "Silver"
};

const PassengerProfile = () => {
  const [profile, setProfile] = useState(demoProfile);
  const [editedProfile, setEditedProfile] = useState(demoProfile);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  
  // Password State
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [changingPassword, setChangingPassword] = useState(false);

  // Preferences State
  const [preferences, setPreferences] = useState({
    emailNotify: true,
    smsNotify: false,
    seatPref: 'Window',
    mealPref: 'Non-Vegetarian',
    language: 'English',
    currency: 'USD ($)'
  });

  const hasChanges = useMemo(() => {
    return editedProfile.fullName !== profile.fullName ||
           editedProfile.contactNumber !== profile.contactNumber ||
           editedProfile.address !== profile.address;
  }, [editedProfile, profile]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = async () => {
    if (!hasChanges) return;
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProfile(editedProfile);
    setSaving(false);
    showToast("Profile updated successfully");
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      showToast("Passwords do not match", "error");
      return;
    }
    setChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPasswords({ current: '', new: '', confirm: '' });
    setChangingPassword(false);
    showToast("Password changed successfully");
  };

  const handleAvatarChange = async (type) => {
    setIsAvatarModalOpen(false);
    showToast("Avatar updated successfully");
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: passwords.new.length >= 8 },
    { label: "At least 1 uppercase letter", met: /[A-Z]/.test(passwords.new) },
    { label: "At least 1 number", met: /[0-9]/.test(passwords.new) },
    { label: "At least 1 special character", met: /[^A-Za-z0-9]/.test(passwords.new) }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-text-primary tracking-tight">Manage Profile</h1>
            <p className="text-text-secondary mt-1 font-medium">View and update your personal information</p>
          </div>

          {/* Section 1: Profile Header */}
          <Card className="p-8 flex flex-col items-center text-center animate-fade-in">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-primary">{getInitials(profile.fullName)}</span>
                )}
              </div>
              <button 
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute bottom-0 right-0 w-8 h-8 bg-white text-primary rounded-full shadow-lg border border-border-color flex items-center justify-center hover:scale-110 transition-transform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </button>
            </div>

            <h2 className="text-2xl font-black text-text-primary mt-4 tracking-tight">{profile.fullName}</h2>
            <p className="text-sm font-medium text-text-secondary">{profile.email}</p>
            
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border-color/50 w-full justify-center">
              <div className="text-center">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Flights</p>
                <p className="text-xl font-black text-text-primary">{profile.totalFlights}</p>
              </div>
              <div className="w-px h-8 bg-border-color/50" />
              <div className="text-center">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Miles</p>
                <p className="text-xl font-black text-text-primary">{profile.milesFlown.toLocaleString()}</p>
              </div>
              <div className="w-px h-8 bg-border-color/50" />
              <div className="text-center">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Tier</p>
                <p className={`text-sm font-black px-3 py-1 rounded-full ${profile.loyaltyTier === 'Silver' ? 'bg-slate-100 text-slate-500' : 'bg-primary/10 text-primary'}`}>
                  {profile.loyaltyTier}
                </p>
              </div>
            </div>
          </Card>

          {/* Section 2: Personal Information */}
          <Card className="p-8 animate-slide-up">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-text-primary tracking-tight">Personal Information</h3>
                <p className="text-sm text-text-secondary font-medium">Update your profile details and contact info</p>
              </div>
              {hasChanges && (
                <div className="flex items-center gap-2 px-3 py-1 bg-warning/10 text-warning rounded-full border border-warning/20">
                  <div className="w-1.5 h-1.5 bg-warning rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Unsaved Changes</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Full Name"
                value={editedProfile.fullName}
                onChange={(e) => setEditedProfile({...editedProfile, fullName: e.target.value})}
                placeholder="Enter your full name"
              />
              <div className="relative">
                <Input 
                  label="Email"
                  value={profile.email}
                  disabled
                  className="bg-background cursor-not-allowed pr-10"
                />
                <svg className="absolute right-3 top-10 w-4 h-4 text-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                <p className="text-[10px] text-text-secondary font-medium italic mt-1 ml-1">Email cannot be changed</p>
              </div>
              <Input 
                label="Contact Number"
                value={editedProfile.contactNumber}
                onChange={(e) => setEditedProfile({...editedProfile, contactNumber: e.target.value})}
                placeholder="+1 234 567 8900"
              />
              <Input 
                label="Address"
                value={editedProfile.address}
                onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                placeholder="123 Main St, City, Country"
              />
              <Input 
                label="Member Since"
                value={profile.memberSince}
                disabled
                className="bg-background opacity-70"
              />
              <Input 
                label="Account Status"
                value="Active"
                disabled
                className="bg-background opacity-70 text-success font-bold"
              />
            </div>

            <div className="mt-8 pt-6 border-t border-border-color/50 flex justify-end gap-3">
              {hasChanges && (
                <Button 
                  variant="outline" 
                  onClick={handleCancelEdit}
                  className="h-11 px-8 rounded-xl border-border-color text-text-secondary"
                  disabled={saving}
                >
                  Cancel
                </Button>
              )}
              <Button 
                onClick={handleSaveProfile}
                disabled={!hasChanges || saving}
                className="h-11 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20"
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : 'Save Changes'}
              </Button>
            </div>
          </Card>

          {/* Section 3: Password & Security */}
          <Card className="p-8">
            <h3 className="text-xl font-black text-text-primary tracking-tight mb-1">Password & Security</h3>
            <p className="text-sm text-text-secondary font-medium mb-6">Update your password to keep your account secure</p>
            
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-5">
                  <Input 
                    label="Current Password"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                  <Input 
                    label="New Password"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                  <Input 
                    label="Confirm New Password"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="bg-background rounded-2xl p-6 border border-border-color">
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">Password Requirements</h4>
                  <ul className="space-y-3">
                    {passwordRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-success text-white' : 'bg-border-color/50 text-white'}`}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                        </div>
                        <span className={`text-xs font-medium ${req.met ? 'text-success' : 'text-text-secondary'}`}>{req.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-border-color/50 flex justify-end">
                <Button 
                  type="submit"
                  disabled={changingPassword || !passwords.current || !passwords.new || passwords.new !== passwords.confirm}
                  className="h-11 px-10 rounded-xl bg-secondary text-white font-black shadow-lg shadow-secondary/20"
                >
                  {changingPassword ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Section 4: Preferences */}
          <Card className="p-8">
            <h3 className="text-xl font-black text-text-primary tracking-tight mb-1">Preferences</h3>
            <p className="text-sm text-text-secondary font-medium mb-8">Customize your experience and notification settings</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-border-color/30">
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Email Notifications</h4>
                  <p className="text-xs text-text-secondary">Receive booking confirmations and flight updates</p>
                </div>
                <button 
                  onClick={() => setPreferences({...preferences, emailNotify: !preferences.emailNotify})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${preferences.emailNotify ? 'bg-primary' : 'bg-border-color'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.emailNotify ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border-color/30">
                <div>
                  <h4 className="text-sm font-bold text-text-primary">SMS Notifications</h4>
                  <p className="text-xs text-text-secondary">Receive urgent flight updates via SMS</p>
                </div>
                <button 
                  onClick={() => setPreferences({...preferences, smsNotify: !preferences.smsNotify})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${preferences.smsNotify ? 'bg-primary' : 'bg-border-color'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.smsNotify ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest ml-1">Seat Preference</label>
                  <select 
                    value={preferences.seatPref}
                    onChange={(e) => setPreferences({...preferences, seatPref: e.target.value})}
                    className="w-full h-11 bg-white border border-border-color rounded-xl px-4 font-bold text-sm"
                  >
                    <option>No Preference</option>
                    <option>Window</option>
                    <option>Aisle</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest ml-1">Meal Preference</label>
                  <select 
                    value={preferences.mealPref}
                    onChange={(e) => setPreferences({...preferences, mealPref: e.target.value})}
                    className="w-full h-11 bg-white border border-border-color rounded-xl px-4 font-bold text-sm"
                  >
                    <option>No Preference</option>
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>Vegan</option>
                    <option>Halal</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-color/50 flex justify-end">
              <Button 
                onClick={() => showToast("Preferences saved")}
                className="h-11 px-10 rounded-xl bg-primary text-white font-black"
              >
                Save Preferences
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Avatar Modal */}
      <Modal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setIsAvatarModalOpen(false)}
        title="Change Avatar"
        width="max-w-[400px]"
      >
        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center border-2 border-dashed border-secondary mb-4">
              <svg className="w-8 h-8 text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </div>
            <p className="text-sm text-text-secondary font-medium">Click to upload a new profile photo</p>
            <p className="text-[10px] text-text-secondary opacity-60 mt-1">Maximum size 2MB (JPG, PNG)</p>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full h-11 bg-primary text-white font-bold rounded-xl" onClick={() => handleAvatarChange('upload')}>
              Upload Photo
            </Button>
            <Button variant="outline" className="w-full h-11 border-border-color text-text-secondary font-bold rounded-xl" onClick={() => setIsAvatarModalOpen(false)}>
              Cancel
            </Button>
            {profile.avatar && (
              <button className="w-full py-2 text-xs font-bold text-error hover:underline mt-2">Remove current photo</button>
            )}
          </div>
        </div>
      </Modal>

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

export default PassengerProfile;
