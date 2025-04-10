import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const CustomerService = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const faqs = [
    {
      id: "1",
      question: "如何申请退货/退款？",
      answer:
        "您可以在订单完成后7天内申请退货/退款。请前往“我的订单”页面，选择需要退货/退款的订单，点击“申请售后”按钮，按照页面提示填写相关信息并提交申请。我们的客服人员会在1-3个工作日内处理您的申请。",
    },
    {
      id: "2",
      question: "订单支付遇到问题怎么办？",
      answer:
        "如果您的订单支付遇到问题，请首先检查您的支付账户余额是否充足，以及银行卡是否已开通网上支付功能。如果问题仍然存在，请联系我们的客服人员，我们将尽快为您解决。",
    },
    {
      id: "3",
      question: "如何修改收货地址？",
      answer:
        "您可以在“我的账户”页面修改您的收货地址。请注意，如果您的订单已经发货，我们将无法修改收货地址。在这种情况下，请您联系物流公司进行协商。",
    },
    {
      id: "4",
      question: "商品质量问题如何处理？",
      answer:
        "如果您收到的商品存在质量问题，请在收到商品后48小时内联系我们的客服人员，并提供相关照片或视频作为证据。我们将尽快为您处理，并提供退货、换货或退款等解决方案。",
    },
    {
      id: "5",
      question: "如何取消订单？",
      answer:
        "您可以在订单发货前取消订单。请前往“我的订单”页面，选择需要取消的订单，点击“取消订单”按钮。订单取消后，我们将尽快为您办理退款。",
    },
  ];

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(query.toLowerCase()) ||
    faq.answer.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "提交成功",
      description: "您的问题已提交，我们会尽快回复您。",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          需要帮助？
        </h1>
        <p className="text-gray-500">
          我们随时为您提供帮助。请查看以下常见问题或联系我们。
        </p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList>
          <TabsTrigger value="faq">常见问题</TabsTrigger>
          <TabsTrigger value="contact">联系我们</TabsTrigger>
        </TabsList>
        <TabsContent value="faq">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>常见问题</CardTitle>
              <CardDescription>
                在这里您可以找到常见问题的答案。
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-6 pr-6">
              <Input
                type="search"
                placeholder="搜索问题..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-4"
              />
              <Accordion type="single" collapsible>
                {filteredFAQs.map((faq) => (
                  <AccordionItem value={faq.id} key={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFAQs.length === 0 && (
                <div className="text-center py-6">
                  <FileTextIcon className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    找不到相关问题。
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>联系我们</CardTitle>
              <CardDescription>
                如果您有其他问题，请填写以下表格联系我们。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    姓名
                  </label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="您的姓名"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    邮箱
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="您的邮箱"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    问题描述
                  </label>
                  <Textarea
                    id="message"
                    placeholder="请详细描述您的问题"
                    rows={4}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">
                  提交
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center">
        <Link to="/" className="text-sm text-blue-500 hover:underline">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default CustomerService;
