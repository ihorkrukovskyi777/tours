export type AnalyticsType =
    'click_pick_a_date'
    | 'click_day_list'
    | 'show_additional_modal'
    | 'closed_additional_sales'
    | 'closed_the_browser'
    | 'first_booking'
    | 'additional_booking'
    | 'show_coupon_modal'
    | 'send_coupon_email'
    | 'decline_coupon'
    | 'close_coupon_modal'
    | 'accepted_the_coupon'
    | 'booking_confirmation_page'
    | 'click_see_all_paid_tours'
    | 'click_paid_tour_card_modal'
    | 'left_the_see_all_paid_tours'
    | 'pick_a_date_paid_tour'
    | 'pick_a_date_paid_tour_full_date'
    | 'checkout_page'
    | 'visible_the_tab_browser'
    | 'hidden_the_tab_browser'


export interface AnalyticsData {
    type: AnalyticsType
    created_at: Date
    pathname: string
    site: string
    page_id: number | null
    locale: string | null
}

export interface AnalyticsDataLeft extends AnalyticsData {
    redirect_pathname: string
}

export interface AnalyticsEvent {
    type: AnalyticsType,
}

