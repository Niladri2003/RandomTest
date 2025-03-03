const BASE_URL = 'http://localhost:4000/api/v1';

interface AuthEndpoints {
    LOGIN_API: string;
    CHANGE_PASSWORD_API: string;
    RESET_PASSWORD_API: string;
    FORGOT_PASSWORD_API: string;
    GET_USER_DATA: string;
}

interface CompanyEndpoints {
    ADD_COMPANY: string;
    GET_COMPANY: string;
    DELETE_COMPANY: string;
    UPDATE_COMPANY: string;
}

interface QueryEndpoints {
    SUBMIT_QUERY: string;
    GET_USER_QUERY: string;
    GET_ADMIN_QUERY: string;
    ADMIN_QUERY_UPDATE: string;
    ADMIN_QUERY_RESOLVE: string;
}

interface MockTestEndpoints {
    SAVE_MOCK_TEST_DRAFT_API: string;
}

interface MockInterviewEndpoints {
    GET_SLOT_BY_DATE: string;
    GET_SLOT_TEMPLATE: string;
    CREATE_SLOT_ADMIN: string;
    CREATE_SLOT_CRON: string;
    UPDATE_SLOT_ADMIN: string;
    DELETE_SLOT_ADMIN: string;
    DELETE_ALL_SLOT_ADMIN: string;
    GET_SLOT_BY_ID: string;
    TOGGLE_SLOT_BY_ID: string;
}

interface MentorEndpoints {
    CREATE_MENTOR: string;
    EDIT_MENTOR: string;
    DELETE_MENTOR: string;
    GET_MENTOR: string;
    GET_MENTOR_DATA: string;
    GET_MENTOR_DATA_ADMIN: string;
}

interface NotificationEndpoints {
    GET_NOTIFICATION: string;
}

interface MockBookingEndpoints {
    GET_ADMIN_BOOKING: string;
    GET_USER_BOOKING: string;
    GET_ADMIN_MENTOR: string;
    ASSIGN_MENTOR: string;
    EDIT_MENTOR: string;
    REMOVE_MENTOR: string;
    ADD_LINKS: string;
    CHANGE_BOOKING_STATUS: string;
    GET_BOOKING_BY_ID: string;
    REMOVE_PENALTY_BY_BOOKING_BY_ID: string;
}

interface MockSessionEndpoints {
    CREATE_SESSION: string;
    DELETE_SESSION: string;
    EDIT_SESSION: string;
    GET_SESSION: string;
}

interface FeedbackEndpoints {
    CREATE_FEEDBACK: string;
    CREATE_FEEDBACK_ADMIN: string;
    GET_ALL_FEEDBACK_ADMIN: string;
    GET_FEEDBACK: string;
    TOGGLE_FEEDBACK: string;
}

interface PaymentEndpoints {
    CAPTURE_PAYMENT: string;
    VERIFY_PAYMENT: string;
    GET_ALL_TRANSACTIONS: string;
    GET_TRANSACTIONS: string;
    SEND_BULK_EMAILS: string;
}

interface StudyMaterialEndpoints {
    GET_PUBLIC_NOTES: string;
    GET_PURCHASED_NOTES: string;
    UPLOAD_NOTES: string;
    GET_ALL_NOTES_ADMIN: string;
    STREAM_PDF: string;
    GET_NOTES_BY_ID: string;
    ARCHIVE_NOTE_API: string;
}

interface WebinarEndpoints {
    GET_PUBLIC_WEBINAR: string;
    GET_PURCHASED_WEBINAR: string;
    UPLOAD_WEBINAR: string;
    GET_ALL_WEBINAR_ADMIN: string;
}

export const authEndpoint: AuthEndpoints = {
    LOGIN_API: `${BASE_URL}/user/login`,
    CHANGE_PASSWORD_API: `${BASE_URL}/user/change-password`,
    RESET_PASSWORD_API: `${BASE_URL}/user/reset-password`,
    FORGOT_PASSWORD_API: `${BASE_URL}/user/forget-password`,
    GET_USER_DATA: `${BASE_URL}/user/get-user-data`,
};

export const company: CompanyEndpoints = {
    ADD_COMPANY: `${BASE_URL}/company/add-company`,
    GET_COMPANY: `${BASE_URL}/company/get-company`,
    DELETE_COMPANY: `${BASE_URL}/company/delete-company`,
    UPDATE_COMPANY: `${BASE_URL}/company/update-company`,
};

export const queryEndpoint: QueryEndpoints = {
    SUBMIT_QUERY: `${BASE_URL}/query/submit`,
    GET_USER_QUERY: `${BASE_URL}/query/my-queries`,
    GET_ADMIN_QUERY: `${BASE_URL}/query/all-queries`,
    ADMIN_QUERY_UPDATE: `${BASE_URL}/query/update-status`,
    ADMIN_QUERY_RESOLVE: `${BASE_URL}/query/resolve-query`,
};

export const mockTest: MockTestEndpoints = {
    SAVE_MOCK_TEST_DRAFT_API: `${BASE_URL}/mock-test/save-draft`,
};

export const mockInterView: MockInterviewEndpoints = {
    GET_SLOT_BY_DATE: `${BASE_URL}/slot/get-slot-date`,
    GET_SLOT_TEMPLATE: `${BASE_URL}/slot/get-slot-template`,
    CREATE_SLOT_ADMIN: `${BASE_URL}/slot/create-slot`,
    CREATE_SLOT_CRON: `${BASE_URL}/slot/create-slot-cron-job`,
    UPDATE_SLOT_ADMIN: `${BASE_URL}/slot/update-slot`,
    DELETE_SLOT_ADMIN: `${BASE_URL}/slot/delete-slot`,
    DELETE_ALL_SLOT_ADMIN: `${BASE_URL}/slot/delete-all-slot`,
    GET_SLOT_BY_ID: `${BASE_URL}/slot/get-slot`,
    TOGGLE_SLOT_BY_ID: `${BASE_URL}/slot/toogle-slot`,
};

export const mentorEndpoints: MentorEndpoints = {
    CREATE_MENTOR: `${BASE_URL}/mentor/create-mentor`,
    EDIT_MENTOR: `${BASE_URL}/mentor/edit-mentor`,
    DELETE_MENTOR: `${BASE_URL}/mentor/delete-mentor`,
    GET_MENTOR: `${BASE_URL}/mentor/get-mentors`,
    GET_MENTOR_DATA: `${BASE_URL}/mentor/get-mentor-data`,
    GET_MENTOR_DATA_ADMIN: `${BASE_URL}/mentor/get-mentor-data-admin`,
};

export const notificationEndpoints: NotificationEndpoints = {
    GET_NOTIFICATION: `${BASE_URL}/notification/get-notification`,
};

export const mockBookingEndpoints: MockBookingEndpoints = {
    GET_ADMIN_BOOKING: `${BASE_URL}/mocksession/get-bookings`,
    GET_USER_BOOKING: `${BASE_URL}/mocksession/get-booking-by-userid`,
    GET_ADMIN_MENTOR: `${BASE_URL}/mocksession/get-admin-and-mentor`,
    ASSIGN_MENTOR: `${BASE_URL}/mocksession/assign-mentor`,
    EDIT_MENTOR: `${BASE_URL}/mocksession/edit-mentor`,
    REMOVE_MENTOR: `${BASE_URL}/mocksession/remove-mentor`,
    ADD_LINKS: `${BASE_URL}/mocksession/add-links`,
    CHANGE_BOOKING_STATUS: `${BASE_URL}/mocksession/change-booking-status`,
    GET_BOOKING_BY_ID: `${BASE_URL}/mocksession/get-booking`,
    REMOVE_PENALTY_BY_BOOKING_BY_ID: `${BASE_URL}/mocksession/remove-penalty`,
};

export const mockSessionEndpoint: MockSessionEndpoints = {
    CREATE_SESSION: `${BASE_URL}/mocksession/create-mock-session`,
    DELETE_SESSION: `${BASE_URL}/mocksession/delete-mock-session`,
    EDIT_SESSION: `${BASE_URL}/mocksession/edit-mock-session`,
    GET_SESSION: `${BASE_URL}/mocksession/get-mock-session`,
};

export const feedbackEndpoint: FeedbackEndpoints = {
    CREATE_FEEDBACK: `${BASE_URL}/feedback/create-feedback`,
    CREATE_FEEDBACK_ADMIN: `${BASE_URL}/feedback/create-feedback-admin`,
    GET_ALL_FEEDBACK_ADMIN: `${BASE_URL}/feedback/get-feedback-admin`,
    GET_FEEDBACK: `${BASE_URL}/feedback/get-feedback-summary`,
    TOGGLE_FEEDBACK: `${BASE_URL}/feedback/toggle-feedback`,
};

