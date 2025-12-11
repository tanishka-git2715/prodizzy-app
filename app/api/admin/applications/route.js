import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(projects);

    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
