import { siteConfig } from './site-config';
import type { Locale } from './i18n';

export type WhatsAppContext =
  | { type: 'product_enquiry'; productName: string; sku?: string; price?: string; currency?: string; url?: string; locale: Locale }
  | { type: 'buy_now'; productName: string; sku?: string; quantity?: number; size?: string; colour?: string; price?: string; currency?: string; url?: string; locale: Locale }
  | { type: 'cart_enquiry'; items: Array<{ name: string; sku?: string; quantity: number; price?: string; currency?: string }>; locale: Locale }
  | { type: 'appointment'; name: string; date?: string; time?: string; appointmentType?: string; country?: string; locale: Locale }
  | { type: 'general'; name?: string; message?: string; locale: Locale };

export function generateWhatsAppMessage(ctx: WhatsAppContext): string {
  const { locale } = ctx;

  if (ctx.type === 'product_enquiry') {
    if (locale === 'ar') {
      return `مرحباً دوغارس للمجوهرات،\n\nأرغب بالاستفسار عن:\n${ctx.productName}${ctx.sku ? `\nرقم المنتج: ${ctx.sku}` : ''}${ctx.price ? `\nالسعر: ${ctx.price}${ctx.currency ? ` (${ctx.currency})` : ''}` : ''}\n\nيرجى مساعدتي في التوافر والشراء.\n\nملاحظة: السعر النهائي والشحن والضرائب قد تتطلب تأكيداً.\n\nشكراً لكم.`;
    }
    return `Hello DUGARS Jewellery,\n\nI would like to enquire about:\n${ctx.productName}${ctx.sku ? `\nSKU: ${ctx.sku}` : ''}${ctx.price ? `\nPrice: ${ctx.price}${ctx.currency ? ` (${ctx.currency})` : ''}` : ''}\n\nPlease assist me with availability and purchase.\n\nNote: Final price, shipping, and taxes may require confirmation.\n\nThank you.`;
  }

  if (ctx.type === 'buy_now') {
    if (locale === 'ar') {
      return `مرحباً دوغارس للمجوهرات،\n\nأرغب بشراء:\n${ctx.productName}${ctx.sku ? `\nرقم المنتج: ${ctx.sku}` : ''}${ctx.quantity ? `\nالكمية: ${ctx.quantity}` : ''}${ctx.size ? `\nالمقاس: ${ctx.size}` : ''}${ctx.colour ? `\nاللون: ${ctx.colour}` : ''}${ctx.price ? `\nالسعر: ${ctx.price}${ctx.currency ? ` (${ctx.currency})` : ''}` : ''}\n\nملاحظة: السعر النهائي والشحن والضرائب قد تتطلب تأكيداً.\n\nشكراً لكم.`;
    }
    return `Hello DUGARS Jewellery,\n\nI would like to purchase:\n${ctx.productName}${ctx.sku ? `\nSKU: ${ctx.sku}` : ''}${ctx.quantity ? `\nQuantity: ${ctx.quantity}` : ''}${ctx.size ? `\nSize: ${ctx.size}` : ''}${ctx.colour ? `\nColour: ${ctx.colour}` : ''}${ctx.price ? `\nPrice: ${ctx.price}${ctx.currency ? ` (${ctx.currency})` : ''}` : ''}\n\nNote: Final price, shipping, and taxes may require confirmation.\n\nThank you.`;
  }

  if (ctx.type === 'cart_enquiry') {
    if (locale === 'ar') {
      let msg = `مرحباً دوغارس للمجوهرات،\n\nأرغب بالاستفسار عن المنتجات التالية:\n`;
      ctx.items.forEach((item, i) => {
        msg += `\n${i + 1}. ${item.name}`;
        if (item.sku) msg += `\nرقم المنتج: ${item.sku}`;
        msg += `\nالكمية: ${item.quantity}`;
        if (item.price) msg += `\nالسعر: ${item.price}${item.currency ? ` (${item.currency})` : ''}`;
        msg += '\n';
      });
      msg += `\nملاحظة: السعر النهائي والشحن والضرائب قد تتطلب تأكيداً.\n\nشكراً لكم.`;
      return msg;
    }
    let msg = `Hello DUGARS Jewellery,\n\nI would like to enquire about the following products:\n`;
    ctx.items.forEach((item, i) => {
      msg += `\n${i + 1}. ${item.name}`;
      if (item.sku) msg += `\nSKU: ${item.sku}`;
      msg += `\nQuantity: ${item.quantity}`;
      if (item.price) msg += `\nPrice: ${item.price}${item.currency ? ` (${item.currency})` : ''}`;
      msg += '\n';
    });
    msg += `\nNote: Final price, shipping, and taxes may require confirmation.\n\nThank you.`;
    return msg;
  }

  if (ctx.type === 'appointment') {
    if (locale === 'ar') {
      return `مرحباً دوغارس للمجوهرات،\n\nأرغب في حجز موعد:\nالاسم: ${ctx.name}${ctx.appointmentType ? `\nنوع الموعد: ${ctx.appointmentType}` : ''}${ctx.country ? `\nالدولة: ${ctx.country}` : ''}${ctx.date ? `\nالتاريخ: ${ctx.date}` : ''}${ctx.time ? `\nالوقت: ${ctx.time}` : ''}\n\nشكراً لكم.`;
    }
    return `Hello DUGARS Jewellery,\n\nI would like to book an appointment:\nName: ${ctx.name}${ctx.appointmentType ? `\nAppointment Type: ${ctx.appointmentType}` : ''}${ctx.country ? `\nCountry: ${ctx.country}` : ''}${ctx.date ? `\nDate: ${ctx.date}` : ''}${ctx.time ? `\nTime: ${ctx.time}` : ''}\n\nThank you.`;
  }

  // general
  if (locale === 'ar') {
    return `مرحباً دوغارس للمجوهرات،\n\n${ctx.message || 'أرغب في الاستفسار عن منتجاتكم.'}\n\nشكراً لكم.`;
  }
  return `Hello DUGARS Jewellery,\n\n${ctx.message || 'I would like to enquire about your products.'}\n\nThank you.`;
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppUrl(ctx: WhatsAppContext, number?: string): string {
  const whatsappNumber = number || siteConfig.whatsappDefault;
  const message = generateWhatsAppMessage(ctx);
  return buildWhatsAppUrl(whatsappNumber, message);
}
