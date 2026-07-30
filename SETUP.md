# InHype Sanctuary — Vercel Deployment Guide

## What's included
- Full website (exact design from HTML version)
- Stripe checkout for all 3 membership plans
- Success page after payment
- Mobile responsive
- Vagaro booking links

---

## Step 1 — Create Stripe account
1. Go to **stripe.com** and create a free account
2. Go to **Dashboard → Products** → Add product for each plan:
   - **Sanctuary Core** — $399/month recurring
   - **Sanctuary Plus** — $499/month recurring  
   - **Sanctuary Elite** — $899/month recurring
3. Copy the **Price ID** for each (looks like `price_xxxxxxxx`)
4. Go to **Developers → API Keys** → copy your Publishable Key and Secret Key

---

## Step 2 — Upload to GitHub
1. Go to **github.com** → New repository → name it `inhype-sanctuary`
2. Upload all these files to the repo

---

## Step 3 — Deploy on Vercel
1. Go to **vercel.com** → Sign up with GitHub
2. Click **"New Project"** → Import your `inhype-sanctuary` repo
3. Before deploying, add **Environment Variables**:

| Variable | Value |
|---|---|
| `STRIPE_SECRET_KEY` | Your Stripe secret key (sk_live_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key (pk_live_...) |
| `STRIPE_PRICE_CORE` | Price ID for $399 plan |
| `STRIPE_PRICE_PLUS` | Price ID for $499 plan |
| `STRIPE_PRICE_ELITE` | Price ID for $899 plan |
| `NEXT_PUBLIC_URL` | https://inhypesanctuary.com |

4. Click **Deploy** — done in 2 minutes!

---

## Step 4 — Connect your domain
1. In Vercel → Project Settings → Domains
2. Add `inhypesanctuary.com`
3. Vercel will show you DNS records to add in Wix (where you bought the domain)
4. In Wix Domains → DNS Settings → Add the records Vercel gives you

---

## Step 5 — Test payments
1. In Stripe, switch to **Test Mode** first
2. Use test card: `4242 4242 4242 4242` / any future date / any CVV
3. When ready, switch to **Live Mode** in both Stripe and your env variables

---

## Your Stripe Dashboard
Everything you need is at **dashboard.stripe.com**:
- All payments and subscriptions
- Customer list with their active plans
- Monthly revenue overview
- Refunds and cancellations

---

## Questions?
Call: (209) 330-0033
Email: inhype.sanctuary@icloud.com
