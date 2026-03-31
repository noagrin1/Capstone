"use client";

import { useState } from "react";
import { usePrototypeAuth } from "../prototype/state/prototypeAuth";
import { AppShell } from "../prototype/ui/AppShell";
import { Button } from "../prototype/ui/Button";
import { Card } from "../prototype/ui/Card";
import { Input } from "../prototype/ui/Input";

export default function AccountPage() {
  const auth = usePrototypeAuth();
  const [name, setName] = useState("Taylor Student");
  const [email, setEmail] = useState("taylor@student.edu");

  return (
    <AppShell title="Account" subtitle="Prototype login (mock)" activeTab="account">
      <div className="space-y-3">
        <Card>
          <p className="text-sm text-slate-600">
            This is a classroom prototype: login is simulated locally (no backend).
          </p>
        </Card>
        {auth.user ? (
          <Card>
            <p className="text-sm font-semibold text-slate-900">Signed in</p>
            <p className="mt-1 text-sm text-slate-600">{auth.user.name}</p>
            <p className="text-sm text-slate-600">{auth.user.email}</p>
            <div className="mt-4">
              <Button variant="secondary" onClick={() => auth.logout()}>
                Log out
              </Button>
            </div>
          </Card>
        ) : (
          <Card>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                auth.login({ name: name.trim(), email: email.trim() });
              }}
            >
              <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button type="submit" disabled={name.trim().length < 2 || email.trim().length < 5}>
                Log in (mock)
              </Button>
            </form>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
