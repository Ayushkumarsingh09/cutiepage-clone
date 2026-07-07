"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy, Download, QrCode, Share2, X } from "lucide-react";

interface ShareModalProps {
  pageId: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ pageId, title, open, onClose }: ShareModalProps) {
  const [url, setUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}/p/${pageId}`;
    setUrl(shareUrl);
    QRCode.toDataURL(shareUrl, {
      width: 280,
      margin: 2,
      color: { dark: "#5b3fe8", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [open, pageId]);

  if (!open) return null;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
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
      await navigator.share({ title, text: "A special page made for you", url });
    } else {
      copyLink();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="size-5 text-[var(--color-violet)]" />
            <h2 className="font-display text-xl font-semibold">Share your page</h2>
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
          Your page is live. Copy the link or download the QR code to share anywhere.
        </p>

        {qrDataUrl && (
          <div className="mx-auto mb-4 flex w-fit flex-col items-center rounded-2xl border border-violet-100 bg-[#fffbf7] p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="QR code" className="size-48" />
            <p className="mt-2 flex items-center gap-1 text-xs text-[var(--color-dim)]">
              <QrCode className="size-3.5" /> Live QR code
            </p>
          </div>
        )}

        <div className="mb-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
          <input
            readOnly
            value={url}
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-violet)] px-3 py-1.5 text-xs font-semibold text-white"
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
      </div>
    </div>
  );
}
