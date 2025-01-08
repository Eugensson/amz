"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CommonForm } from "@/app/[locale]/admin/settings/common-form";
import { CarouselForm } from "@/app/[locale]/admin/settings/carousel-form";
import { LanguageForm } from "@/app/[locale]/admin/settings/language-form";
import { CurrencyForm } from "@/app/[locale]/admin/settings/currency-form";
import { SiteInfoForm } from "@/app/[locale]/admin/settings/site-info-form";
import { DeliveryDateForm } from "@/app/[locale]/admin/settings/delivery-date-form";
import { PaymentMethodForm } from "@/app/[locale]/admin/settings/payment-method-form";

import { useToast } from "@/hooks/use-toast";
import useSetting from "@/hooks/use-setting-store";
import { SettingInputSchema } from "@/lib/validator";
import { ClientSetting, ISettingInput } from "@/types";
import { updateSetting } from "@/lib/actions/setting.actions";

export const SettingForm = ({ setting }: { setting: ISettingInput }) => {
  const { setSetting } = useSetting();

  const form = useForm<ISettingInput>({
    resolver: zodResolver(SettingInputSchema),
    defaultValues: setting,
  });
  const {
    formState: { isSubmitting },
  } = form;

  const { toast } = useToast();
  async function onSubmit(values: ISettingInput) {
    const res = await updateSetting({ ...values });
    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
    } else {
      toast({
        description: res.message,
      });
      setSetting(values as ClientSetting);
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SiteInfoForm id="setting-site-info" form={form} />
        <CommonForm id="setting-common" form={form} />
        <CarouselForm id="setting-carousels" form={form} />

        <LanguageForm id="setting-languages" form={form} />

        <CurrencyForm id="setting-currencies" form={form} />

        <PaymentMethodForm id="setting-payment-methods" form={form} />

        <DeliveryDateForm id="setting-delivery-dates" form={form} />

        <div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full mb-24"
          >
            {isSubmitting ? "Submitting..." : `Save Setting`}
          </Button>
        </div>
      </form>
    </Form>
  );
};