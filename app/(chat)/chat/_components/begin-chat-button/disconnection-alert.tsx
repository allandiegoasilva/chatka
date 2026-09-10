"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

export function DisconnectionAlert() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert variant="destructive" className="relative pr-10">
      <AlertCircle className="size-4" />
      <div className="flex-1">
        <AlertTitle>{t.connect.disconnectedTitle}</AlertTitle>
        <AlertDescription>{t.connect.disconnectedDescription}</AlertDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 rounded-md text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
        onClick={() => setIsVisible(false)}
        aria-label={t.connect.closeAlert}
      >
        <X className="size-4" />
      </Button>
    </Alert>
  );
}
