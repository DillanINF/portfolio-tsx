import { NextResponse } from 'next/server';

// POST to GitHub GraphQL API to get contribution calendar for the last year
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: 'Missing GITHUB_TOKEN in environment. Create a fine-grained PAT (no scopes needed for public data) and add it to your env.' },
        { status: 500 }
      );
    }

    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const login = process.env.GITHUB_LOGIN || 'DillanINF';
    const body = JSON.stringify({ query, variables: { login } });

    const res = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-app'
      },
      body
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'GitHub API error', detail: text }, { status: res.status });
    }

    const data = await res.json();

    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return NextResponse.json({ error: 'No calendar data' }, { status: 404 });
    }

    // Cache on the edge for 1 hour to reduce rate-limit, but allow revalidation
    return NextResponse.json(calendar, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=1800, stale-while-revalidate=3600'
      }
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
