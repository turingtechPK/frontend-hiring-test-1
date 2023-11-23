"use client";

import { withGuestGuard } from "@hoc/with-guest-guard";
import { AuthLayout } from "@layouts/auth";

export default withGuestGuard(AuthLayout);
