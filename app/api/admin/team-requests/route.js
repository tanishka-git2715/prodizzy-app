import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    try {
        const { data: requests, error } = await supabase
            .from('team_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(requests);

    } catch (error) {
        console.error('Error fetching team requests:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
