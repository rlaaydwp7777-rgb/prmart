"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateDescriptionAction, registerProductAction } from "@/app/actions";
import type { FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, CheckCircle, Loader2, Sparkles, Terminal, XCircle } from "lucide-react";

const productSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  category: z.string().min(1, "Please select a category."),
  tags: z.string().min(1, "Please enter at least one tag."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
});

type ProductFormData = z.infer<typeof productSchema>;

const initialState: FormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
      Submit for Quality Review
    </Button>
  );
}

export function ProductRegistrationForm() {
  const [formState, formAction] = useFormState(registerProductAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
      price: 0
    }
  });
  
  const titleValue = watch("title");

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        toast({
          title: "Success!",
          description: formState.message,
        });
        if(formRef.current) formRef.current.reset();
      } else {
         toast({
          title: "Submission Status",
          description: formState.message,
          variant: "destructive",
        });
      }
    }
  }, [formState, toast]);

  const handleGenerateDescription = async () => {
    if (!titleValue || titleValue.trim().length < 5) {
      toast({
        title: "Error",
        description: "Please enter a valid title (at least 5 characters) to generate a description.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    const result = await generateDescriptionAction(titleValue);
    setIsGenerating(false);
    if (result.description) {
      setValue("description", result.description, { shouldValidate: true });
      toast({
        title: "Description Generated!",
        description: "The AI has generated a product description for you.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Bot /> AI Seller Assistant
        </CardTitle>
        <CardDescription>Register your new product. Our AI will help you along the way.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" name="title" placeholder="e.g., Ultimate Productivity Planner Template" {...register("title")} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Product Description</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate with AI
              </Button>
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your product, its features, and who it's for."
              className="min-h-[120px]"
              {...register("description")}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" onValueChange={(value) => setValue('category', value, {shouldValidate: true})}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
               {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₩)</Label>
              <Input id="price" name="price" type="number" placeholder="e.g., 10000" {...register("price")} />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input id="tags" name="tags" placeholder="e.g., productivity, notion, template" {...register("tags")} />
            <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
            {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
          </div>

          <SubmitButton />
        </form>

        {formState.issues && formState.issues.length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Form Errors</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5">
                {formState.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {formState.qualityResult && (
          <Alert className="mt-4" variant={formState.qualityResult.isApproved ? "default" : "destructive"}>
             {formState.qualityResult.isApproved ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>AI Quality Control Result</AlertTitle>
            <AlertDescription>
              <p><strong>Score:</strong> {(formState.qualityResult.qualityScore * 100).toFixed(0)}/100</p>
              <p><strong>Status:</strong> {formState.qualityResult.isApproved ? "Approved" : "Sent for Manual Review"}</p>
              <p><strong>Reason:</strong> {formState.qualityResult.reason}</p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
