
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ScanLine, Crown, User as UserIcon, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');

  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    const redirectTo = from || (role === 'admin' ? '/admin' : '/dashboard');
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      await login(email, password, role);
    } catch (error) {
      // Error handling is done in the login function
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <ScanLine className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">ScannerApp</CardTitle>
          <p className="text-gray-600">Sign in to your account</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Login as</Label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">User</span>
              </div>
              <Switch
                checked={role === 'admin'}
                onCheckedChange={(checked) => setRole(checked ? 'admin' : 'user')}
                className="data-[state=checked]:bg-purple-600"
              />
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Admin</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading || !email || !password}
              className={`w-full transition-colors duration-200 ${
                role === 'admin' 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  {role === 'admin' ? <Crown className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                  <span>Sign in as {role === 'admin' ? 'Admin' : 'User'}</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
