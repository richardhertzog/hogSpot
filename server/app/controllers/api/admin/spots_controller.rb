class Api::Admin::SpotsController < ApplicationController
  include AdminAuthenticated

  def index
    spots = ParkingSpot.pending.with_attached_photo
    render json: spots.map { |spot| spot_json(spot) }
  end

  def update
    spot = ParkingSpot.with_attached_photo.find(params[:id])
    if spot.update(spot_params)
      render json: spot_json(spot)
    else
      render json: { errors: spot.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    ParkingSpot.find(params[:id]).destroy
    head :no_content
  end

  private

  def spot_params
    params.expect(parking_spot: [ :lat, :lng, :paid, :hours, :description, :notes, :address, :status, :photo ])
  end

  def spot_json(spot)
    spot.as_json.merge(
      photo_url: spot.photo.attached? ? url_for(spot.photo) : nil
    )
  end
end
