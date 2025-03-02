"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function VoteConfirmationPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  if (status === "success") {
    return (
      <div className="container mx-auto max-w-md py-10">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Hlas bol úspešne potvrdený!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Ďakujeme za váš hlas v súťaži o najlepšieho trénera.</p>
            <Button asChild>
              <Link href="/">Späť na hlavnú stránku</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle>Overenie hlasu zlyhalo</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">{message || "Váš hlas nemohol byť potvrdený."}</p>
          <Button asChild>
            <Link href="/">Späť na hlavnú stránku</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
