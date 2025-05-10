import { db } from '@/server/db';
import { subscriptions } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const currency = searchParams.get('currency');
    const frequency = searchParams.get('frequency');
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let query = db.select().from(subscriptions);
    const filters = [];
    if (currency) filters.push(eq(subscriptions.currency, currency));
    if (frequency) filters.push(eq(subscriptions.frequency, frequency));
    if (category) filters.push(eq(subscriptions.category, category));
    if (status) filters.push(eq(subscriptions.status, status));
    query = query.where(and(...filters));

    const filteredSubscriptions = await query.limit(1000);

    return NextResponse.json(filteredSubscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}