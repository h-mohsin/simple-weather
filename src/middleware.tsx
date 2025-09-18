import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const location = searchParams.get('location');
    const unit = searchParams.get('unit');
    const lng = searchParams.get('lng')
    const lat = searchParams.get('lat')

    let invalidLocation = !location && (!lng || !lat) 
    let invalidUnit = !unit

    let redirect = false;

    let url;

    if (invalidLocation || invalidUnit) {
        url = request.nextUrl.clone();
        redirect = true;
    }
    
    if (invalidLocation) {
        url.searchParams.set('location', 'Tokyo, Japan');
    }

    if (invalidUnit) {
        url.searchParams.set('unit', 'imperial');
    }

    if (redirect) {
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
