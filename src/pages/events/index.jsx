import { Outlet, useParams } from 'react-router';
import EventPage from './eventPage';

function Events() {
    const { id } = useParams();

    if (id) {
        return <Outlet />
    }

    return <EventPage />
}

export default Events
