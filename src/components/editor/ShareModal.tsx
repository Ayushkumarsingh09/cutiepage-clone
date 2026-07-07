"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy, Download, ExternalLink, QrCode, Share2, X } from "lucide-react";

interface ShareModalProps {
  shareUrl: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ shareUrl, title, open, onClose }: ShareModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open || !shareUrl) return;
    QRCode.toDataURL(shareUrl, {
      width: 280,
      margin: 2,
      color: { dark: "#5b3fe8", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [open, shareUrl]);

  if (!open || !shareUrl) return null;

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadQr() {
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-qr.png`;
    link.click();
  }

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({ title, text: "A special page made for you 💕", url: shareUrl });
    } else {
      copyLink();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="size-5 text-[var(--color-violet)]" />
            <h2 className="font-display text-xl font-semibold">Your page is live!</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="mb-4 text-sm text-[var(--color-dim)]">
          Copy this link and send it to someone special. They can open it on any phone or
          computer — no app needed.
        </p>

        {qrDataUrl && (
          <div className="mx-auto mb-4 flex w-fit flex-col items-center rounded-2xl border border-violet-100 bg-[#fffbf7] p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="QR code" className="size-48" />
            <p className="mt-2 flex items-center gap-1 text-xs text-[var(--color-dim)]">
              <QrCode className="size-3.5" /> Scan to open
            </p>
          </div>
        )}

        <div className="mb-4 flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
          <input
            readOnly
            value={shareUrl}
            className="flex-1 break-all bg-transparent text-xs outline-none"
          />
          <button
            type="button"
            onClick={copyLink}
            className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-[var(--color-violet)] px-3 py-1.5 text-xs font-semibold text-white"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={downloadQr}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
          >
            <Download className="size-4" /> Download QR
          </button>
          <button
            type="button"
            onClick={nativeShare}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-violet)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-electric)]"
          >
            <Share2 className="size-4" /> Share
          </button>
        </div>

        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-violet-200 py-2.5 text-sm font-semibold text-[var(--color-violet)] hover:bg-violet-50"
        >
          <ExternalLink className="size-4" /> Open live page
        </a>
      </div>
    </div>
  );
}
