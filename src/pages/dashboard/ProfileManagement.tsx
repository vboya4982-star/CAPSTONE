import React, { useState, useRef } from 'react';
import { useAppStore } from '../../lib/store';
import { User, Mail, GraduationCap, Building, ChevronDown, Check, Camera, Upload, Trash2, Globe, Link as LinkIcon, Phone, MapPin } from 'lucide-react';

export default function ProfileManagement() {
  const { state, setUser } = useAppStore();
  const [profile, setProfile] = useState(state.user);
  const [isSaved, setIsSaved] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Alumni'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB. Please upload a smaller image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        const updated = { ...profile, avatar: base64Image };
        setProfile(updated);
        setUser(updated);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    const updated = { ...profile, avatar: undefined };
    setProfile(updated);
    setUser(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const currentAvatar = profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=19D3AE&color=07111F&size=120`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-brand-text-primary">My Profile</h1>
        <p className="text-sm text-brand-text-secondary">Manage your personal information, profile avatar, and academic details.</p>
      </div>

      {/* Hidden File Input for Image Upload */}
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={handleImageUpload}
      />

      <div className="glass-card overflow-hidden">
        {/* Profile Banner */}
        <div className="h-44 bg-gradient-to-r from-brand-card via-brand-accent-primary/20 to-brand-bg-primary border-b border-brand-border relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-accent-primary/10 via-transparent to-transparent"></div>
          
          {/* Avatar Area */}
          <div className="absolute -bottom-14 left-8 flex items-end gap-5">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative group cursor-pointer"
              title="Click to upload profile photo"
            >
              <img 
                src={currentAvatar} 
                alt="Avatar" 
                className="rounded-2xl ring-4 ring-brand-bg-primary h-28 w-28 object-cover shadow-2xl group-hover:ring-brand-accent-primary transition-all duration-300 bg-brand-bg-secondary" 
              />
              <div className="absolute inset-0 rounded-2xl bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="text-white mb-1" size={20} />
                <span className="text-white text-[10px] font-extrabold uppercase tracking-wider">Upload</span>
              </div>
            </div>

            <div className="mb-2 hidden sm:flex items-center gap-2">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-brand-accent-primary text-brand-bg-primary text-xs font-bold shadow-md hover:shadow-[0_0_15px_rgba(25,211,174,0.4)] transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Upload size={14} /> Upload Photo
              </button>
              {profile.avatar && (
                <button 
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-1.5 rounded-xl bg-brand-bg-secondary text-brand-text-secondary hover:text-brand-danger border border-brand-border text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 pt-20 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-4 w-4 text-brand-text-secondary" /></div>
                <input 
                  type="text" 
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary font-medium text-sm" 
                  value={profile.name} 
                  onChange={e => setProfile({...profile, name: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-4 w-4 text-brand-text-secondary" /></div>
                <input 
                  type="email" 
                  disabled 
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary/40 border border-brand-border rounded-xl text-brand-text-secondary cursor-not-allowed opacity-70 text-sm font-medium" 
                  value={profile.email} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">University / College</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><GraduationCap className="h-4 w-4 text-brand-text-secondary" /></div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm font-medium" 
                  value={profile.college || 'Kalasalingam University'} 
                  onChange={e => setProfile({...profile, college: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">Department</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Building className="h-4 w-4 text-brand-text-secondary" /></div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm font-medium" 
                  value={profile.department || ''} 
                  onChange={e => setProfile({...profile, department: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">Academic Year</label>
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-left text-sm font-medium relative z-10"
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-4 w-4 text-brand-text-secondary" />
                  </div>
                  <span>{profile.year || 'Select Year'}</span>
                  <ChevronDown className={`h-4 w-4 text-brand-text-secondary transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                    <div className="absolute z-20 mt-1 w-full bg-brand-bg-secondary border border-brand-border rounded-xl shadow-xl overflow-hidden py-1">
                      {years.map((year) => (
                        <div 
                          key={year}
                          onClick={() => { setProfile({...profile, year}); setIsDropdownOpen(false); }}
                          className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-brand-card transition-colors flex items-center justify-between ${profile.year === year ? 'text-brand-accent-primary font-bold bg-brand-card/50' : 'text-brand-text-primary'}`}
                        >
                          {year}
                          {profile.year === year && <Check size={16} className="text-brand-accent-primary" />}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">GitHub Profile URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Globe className="h-4 w-4 text-brand-text-secondary" /></div>
                <input 
                  type="url" 
                  placeholder="https://github.com/vamsi-boya"
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm font-medium" 
                  value={profile.github || ''} 
                  onChange={e => setProfile({...profile, github: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">LinkedIn Profile URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LinkIcon className="h-4 w-4 text-brand-text-secondary" /></div>
                <input 
                  type="url" 
                  placeholder="https://linkedin.com/in/boya-vamsi"
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm font-medium" 
                  value={profile.linkedin || ''} 
                  onChange={e => setProfile({...profile, linkedin: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-4 w-4 text-brand-text-secondary" /></div>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm font-medium" 
                  value={profile.phone || ''} 
                  onChange={e => setProfile({...profile, phone: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">Location / City</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-4 w-4 text-brand-text-secondary" /></div>
                <input 
                  type="text" 
                  placeholder="Hyderabad, India"
                  className="block w-full pl-10 pr-3 py-2.5 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm font-medium" 
                  value={profile.location || ''} 
                  onChange={e => setProfile({...profile, location: e.target.value})} 
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-text-secondary mb-1.5">Professional Bio</label>
            <textarea 
              rows={4} 
              className="block w-full p-3 bg-brand-bg-secondary border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent-primary focus:border-brand-accent-primary transition-all text-brand-text-primary text-sm font-medium resize-none" 
              value={profile.bio || ''} 
              onChange={e => setProfile({...profile, bio: e.target.value})} 
              placeholder="Write a short bio about your career goals and technical interests..." 
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-brand-border">
            {isSaved && <span className="text-brand-success text-sm font-bold flex items-center gap-1"><Check size={16} /> Changes Saved!</span>}
            <button 
              type="submit" 
              className="bg-brand-accent-primary text-brand-bg-primary px-8 py-2.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(25,211,174,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
