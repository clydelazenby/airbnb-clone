# frozen_string_literal: true

module Properties
  class ReservationsController < ApplicationController
    before_action :authenticate_user!

    def new
      @property = Property.find(params[:property_id])
      @reservation = @property.reservations.new
    end

    private

    def new_reservation_params
      params.permit(
        :checkin_date, :checkout_date, :subtotal, :cleaning_fee,
        :service_fee, :total
      )
    end
  end
end
