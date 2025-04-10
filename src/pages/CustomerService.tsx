import React, { useState } from "react";
import { FileText as FileTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Phone,
  Mail,
  User,
  HelpCircle,
  Truck,
  Package,
  RefreshCw,
  CreditCard,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "姓名不能少于2个字符" }),
  email: z.string().email({ message: "请输入有效的电子邮箱" }),
  subject: z.string().min(2, { message: "请输入问题主题" }),
  message: z.string().min(10, { message: "消息内容不能少于10个字符" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// 模拟常见问题数据
const faqs = [
  {
    category: "订单与支付",
    questions: [
      {
        question: "如何查看我的订单状态？",
        answer: "您可以在「我的订单」页面查看所有订单的状态和详情。订单状态包括待付款、处理中、已发货、待收货和已完成等。",
      },
      {
        question: "支持哪些支付方式？",
        answer: "我们目前支持支付宝、微信支付、银联支付和货到付款等多种支付方式。在结算页面可以选择您偏好的支付方式。",
      },
      {
        question: "下单后可以修改订单吗？",
        answer: "订单提交后，如果订单状态仍为「待付款」，您可以取消订单重新下单。如果订单已付款，请联系客服协助修改。",
      },
    ],
  },
  {
    category: "配送与物流",
    questions: [
      {
        question: "产品配送时间是多久？",
        answer: "我们一般在确认付款后1-2个工作日内发货，具体到达时间取决于您的收货地址，一般为发货后2-5天送达。",
      },
      {
        question: "如何查询物流状态？",
        answer: "在「我的订单」页面，选择相应订单后可以查看物流单号和物流详情。您也可以通过物流公司官网或APP查询。",
      },
      {
        question: "是否所有地区都支持配送？",
        answer: "我们目前支持中国大陆所有省市的配送服务。港澳台地区和海外暂不支持配送。",
      },
    ],
  },
  {
    category: "退换与售后",
    questions: [
      {
        question: "如何申请退换货？",
        answer: "您可以在「我的订单」页面，选择相应订单后点击「申请退货」按钮。填写退货原因并提交后，我们会尽快处理您的申请。",
      },
      {
        question: "退货政策是怎样的？",
        answer: "自收到商品之日起7天内，商品完好未使用可申请无理由退货。食品安全问题可在保质期内申请退货。部分特殊商品可能不支持无理由退货，请在购买前查看商品详情页的说明。",
      },
      {
        question: "退款会多久到账？",
        answer: "退货申请审核通过后，我们将在收到退回商品并确认无误后的1-7个工作日内处理退款。具体到账时���依据支付平台而定，一般为1-5个工作日。",
      },
    ],
  },
  {
    category: "商品与服务",
    questions: [
      {
        question: "如何确保农产品的新鲜度？",
        answer: "我们采用冷链物流配送，确保农产品从农场到您手中的全程新鲜。大多数水果蔬菜都是从农场直接采摘后配送，保证最大程度的新鲜度。",
      },
      {
        question: "产品是否都是有机认证的？",
        answer: "我们平台上的产品包括有机认证和非有机认证的农产品。有机认证的产品会在产品详情页明确标注并提供认证信息。",
      },
      {
        question: "如何查看商品的产地信息？",
        answer: "每个商品的详情页都会显示其产地信息，包括产地位置、种植环境等。部分商品还提供产地溯源功能，可以查看完整的生产过程。",
      },
    ],
  },
];

// 模拟聊天记录
const initialMessages = [
  {
    id: 1,
    content: "您好，欢迎使用在线客服。请问有什么可以帮助您的？",
    sender: "agent",
    time: "10:30",
  },
];

const CustomerService = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: messages.length + 1,
      content: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");

    // 模拟客服回复
    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        content: "感谢您的咨询。我们的客服人员将尽快回复您的问题。您也可以查看常见问题解答，或者通过电话与我们联系。",
        sender: "agent",
        time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const onSubmitContactForm = (data: ContactFormValues) => {
    // 模拟提交表单
    console.log("表单数据:", data);
    
    toast({
      title: "提交成功",
      description: "我们已收到您的留言，将尽快与您联系。",
    });

    form.reset();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-farm-green hover:underline mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回首页
        </Link>
        <h1 className="text-2xl font-bold text-farm-brown">客户服务中心</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="chat" className="flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                在线客服
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center justify-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                常见问题
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                留言反馈
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>在线客服</CardTitle>
                  <CardDescription>
                    与我们的客服人员实时聊天，解决您的问题
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-50 rounded-md p-4 h-[400px] overflow-y-auto flex flex-col space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-farm-green text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs opacity-70 block text-right mt-1">
                            {message.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
                    <Input
                      placeholder="输入您的问题..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      发送
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>常见问题解答</CardTitle>
                  <CardDescription>
                    浏览常见问题，快速找到您需要的答案
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((category, i) => (
                      <AccordionItem key={i} value={`category-${i}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {category.category}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 mt-2">
                            {category.questions.map((faq, j) => (
                              <Accordion key={j} type="single" collapsible className="border rounded-md">
                                <AccordionItem value={`question-${i}-${j}`}>
                                  <AccordionTrigger className="px-4 text-left">
                                    {faq.question}
                                  </AccordionTrigger>
                                  <AccordionContent className="px-4 pb-4">
                                    {faq.answer}
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>留言反馈</CardTitle>
                  <CardDescription>
                    如果以上方式无法解决您的问题，请留言给我们
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitContactForm)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>姓名</FormLabel>
                            <FormControl>
                              <Input placeholder="请输入您的姓名" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>电子邮箱</FormLabel>
                            <FormControl>
                              <Input placeholder="请输入您的电子邮箱" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>问题主题</FormLabel>
                            <FormControl>
                              <Input placeholder="请输入问题主题" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>留言内容</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="请详���描述您的问题或建议..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">提交留言</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>联系方式</CardTitle>
              <CardDescription>其他联系我们的方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-farm-green" />
                <div>
                  <p className="font-medium">客服热线</p>
                  <p className="text-sm text-gray-500">400-888-7777</p>
                  <p className="text-xs text-gray-500">工作时间: 9:00-18:00 (周一至周日)</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-farm-green" />
                <div>
                  <p className="font-medium">电子邮箱</p>
                  <p className="text-sm text-gray-500">support@farmfresh.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>快速入口</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center justify-start h-auto py-3" asChild>
                <Link to="/orders">
                  <FileTextIcon className="h-4 w-4 mr-2 text-farm-green" />
                  <span>我的订单</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center justify-start h-auto py-3" asChild>
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2 text-farm-green" />
                  <span>个人中心</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center justify-start h-auto py-3" asChild>
                <Link to="/products">
                  <Package className="h-4 w-4 mr-2 text-farm-green" />
                  <span>浏览商品</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center justify-start h-auto py-3" asChild>
                <Link to="/">
                  <Truck className="h-4 w-4 mr-2 text-farm-green" />
                  <span>配送查询</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center justify-start h-auto py-3" asChild>
                <Link to="/">
                  <RefreshCw className="h-4 w-4 mr-2 text-farm-green" />
                  <span>退换货政策</span>
                </Link>
              </Button>
              <Button variant="outline" className="flex items-center justify-start h-auto py-3" asChild>
                <Link to="/">
                  <CreditCard className="h-4 w-4 mr-2 text-farm-green" />
                  <span>支付方式</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
