
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Settings, 
  Globe, 
  Bell, 
  Mail, 
  Shield,
  Save
} from "lucide-react";

interface SystemSettingsState {
  site: {
    title: string;
    description: string;
    logo: string;
    footer: string;
    contactEmail: string;
  };
  notification: {
    enableEmailNotifications: boolean;
    enableBrowserNotifications: boolean;
    adminEmailNotifications: boolean;
    dailyReportEmail: string;
  };
  security: {
    enableRegistration: boolean;
    requireEmailVerification: boolean;
    passwordMinLength: number;
    sessionTimeout: number;
    ipBlacklist: string;
  };
}

const SystemSettings = () => {
  const [settings, setSettings] = useState<SystemSettingsState>({
    site: {
      title: "农产品交易平台",
      description: "专注于提供优质、可靠的农产品交易服务",
      logo: "/placeholder.svg",
      footer: "© 2023 农产品交易平台. 保留所有权利。",
      contactEmail: "contact@farm-market.com"
    },
    notification: {
      enableEmailNotifications: true,
      enableBrowserNotifications: false,
      adminEmailNotifications: true,
      dailyReportEmail: "admin@farm-market.com"
    },
    security: {
      enableRegistration: true,
      requireEmailVerification: true,
      passwordMinLength: 8,
      sessionTimeout: 30,
      ipBlacklist: "192.168.1.100\n10.0.0.5"
    }
  });

  // 处理站点设置变更
  const handleSiteChange = (key: keyof typeof settings.site, value: string) => {
    setSettings({
      ...settings,
      site: {
        ...settings.site,
        [key]: value
      }
    });
  };

  // 处理通知设置变更
  const handleNotificationChange = (key: keyof typeof settings.notification, value: boolean | string) => {
    setSettings({
      ...settings,
      notification: {
        ...settings.notification,
        [key]: value
      }
    });
  };

  // 处理安全设置变更
  const handleSecurityChange = (key: keyof typeof settings.security, value: boolean | number | string) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: value
      }
    });
  };

  // 保存设置
  const handleSaveSettings = () => {
    // 这里应该是发送请求到服务器保存设置
    // 暂时只显示成功提示
    toast({
      title: "保存成功",
      description: "系统设置已更新"
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Settings className="h-6 w-6 text-farm-brown mr-2" />
            <div>
              <CardTitle className="text-xl font-bold">系统设置</CardTitle>
              <CardDescription>管理系统的全局配置和参数</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="site" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="site" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" /> 站点设置
              </TabsTrigger>
              <TabsTrigger value="notification" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" /> 通知设置
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" /> 安全设置
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="site" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-title">站点名称</Label>
                  <Input 
                    id="site-title" 
                    value={settings.site.title}
                    onChange={(e) => handleSiteChange("title", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">站点描述</Label>
                  <Textarea 
                    id="site-description" 
                    value={settings.site.description}
                    onChange={(e) => handleSiteChange("description", e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-logo">Logo URL</Label>
                  <Input 
                    id="site-logo" 
                    value={settings.site.logo}
                    onChange={(e) => handleSiteChange("logo", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-footer">页脚文本</Label>
                  <Input 
                    id="site-footer" 
                    value={settings.site.footer}
                    onChange={(e) => handleSiteChange("footer", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">联系邮箱</Label>
                  <Input 
                    id="contact-email" 
                    type="email"
                    value={settings.site.contactEmail}
                    onChange={(e) => handleSiteChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notification" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">邮件通知</Label>
                    <p className="text-sm text-muted-foreground">
                      启用系统邮件通知功能
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={settings.notification.enableEmailNotifications}
                    onCheckedChange={(checked) => 
                      handleNotificationChange("enableEmailNotifications", checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">浏览器通知</Label>
                    <p className="text-sm text-muted-foreground">
                      启用浏览器推送通知功能
                    </p>
                  </div>
                  <Switch 
                    id="browser-notifications"
                    checked={settings.notification.enableBrowserNotifications}
                    onCheckedChange={(checked) => 
                      handleNotificationChange("enableBrowserNotifications", checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="admin-email-notifications">管理员邮件通知</Label>
                    <p className="text-sm text-muted-foreground">
                      系统事件发生时通知管理员
                    </p>
                  </div>
                  <Switch 
                    id="admin-email-notifications"
                    checked={settings.notification.adminEmailNotifications}
                    onCheckedChange={(checked) => 
                      handleNotificationChange("adminEmailNotifications", checked)
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="daily-report-email">每日报告接收邮箱</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="daily-report-email" 
                      type="email"
                      value={settings.notification.dailyReportEmail}
                      onChange={(e) => 
                        handleNotificationChange("dailyReportEmail", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-registration">开放注册</Label>
                    <p className="text-sm text-muted-foreground">
                      允许新用户注册账号
                    </p>
                  </div>
                  <Switch 
                    id="enable-registration"
                    checked={settings.security.enableRegistration}
                    onCheckedChange={(checked) => 
                      handleSecurityChange("enableRegistration", checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-email-verification">邮箱验证</Label>
                    <p className="text-sm text-muted-foreground">
                      要求新用户验证邮箱后才能使用系统
                    </p>
                  </div>
                  <Switch 
                    id="require-email-verification"
                    checked={settings.security.requireEmailVerification}
                    onCheckedChange={(checked) => 
                      handleSecurityChange("requireEmailVerification", checked)
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-min-length">
                    密码最小长度 ({settings.security.passwordMinLength})
                  </Label>
                  <Input 
                    id="password-min-length" 
                    type="number"
                    min={6}
                    max={32}
                    value={settings.security.passwordMinLength}
                    onChange={(e) => 
                      handleSecurityChange("passwordMinLength", parseInt(e.target.value) || 8)
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">
                    会话超时（分钟）({settings.security.sessionTimeout})
                  </Label>
                  <Input 
                    id="session-timeout" 
                    type="number"
                    min={5}
                    max={1440}
                    value={settings.security.sessionTimeout}
                    onChange={(e) => 
                      handleSecurityChange("sessionTimeout", parseInt(e.target.value) || 30)
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ip-blacklist">IP黑名单（每行一个）</Label>
                  <Textarea 
                    id="ip-blacklist" 
                    value={settings.security.ipBlacklist}
                    onChange={(e) => handleSecurityChange("ipBlacklist", e.target.value)}
                    rows={4}
                    placeholder="192.168.1.100&#10;10.0.0.5"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSaveSettings}
              className="bg-farm-green hover:bg-farm-green-dark"
            >
              <Save className="mr-2 h-4 w-4" />
              保存设置
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
