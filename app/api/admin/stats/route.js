import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    try {
        // Fetch total users count
        const { count: userCount, error: userError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });

        if (userError) throw userError;

        // Fetch total projects count
        const { count: projectCount, error: projectError } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true });

        if (projectError) throw projectError;

        return NextResponse.json({
            users: userCount || 0,
            projects: projectCount || 0
        });

    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
