import { Mail, MessageCircle, Clock } from "lucide-react";
import ContactForm from "@/components/marketing/ContactForm";

export const metadata = {
  title: "Contact - Cutiepage Clone",
  description: "Get in touch with our team for help or questions.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email us",
    description: "hello@cutiepage.clone",
    detail: "We respond within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "Live chat",
    description: "Available Mon–Sat",
    detail: "9 AM – 6 PM IST",
  },
  {
    icon: Clock,
    title: "Quick help",
    description: "Check our FAQ",
    detail: "Most questions answered instantly",
  },
];

export default function ContactPage() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet">
            Contact
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-4 text-lg text-dim">
            Have a question, feedback, or just want to say hi? Drop us a message.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-violet/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet/10 text-violet">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-foreground">{item.description}</p>
                    <p className="mt-0.5 text-xs text-dim">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-violet/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Send us a message
              </h2>
              <p className="mt-1 text-sm text-dim">
                Fill out the form and we&apos;ll get back to you soon.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
