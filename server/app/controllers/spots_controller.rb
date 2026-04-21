class SpotsController < ApplicationController
  def index
    spots = ParkingSpot.approved.with_attached_photo
    render json: spots.map { |spot| spot_json(spot) }
  end

  def create
    spot = ParkingSpot.new(spot_params)
    if spot.save
      render json: spot_json(spot), status: :created
    else
      render json: { errors: spot.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def spot_params
    params.expect(parking_spot: [ :lat, :lng, :paid, :hours, :description, :notes, :address, :submitter_name, :submitter_email, :photo ])
        .transform_values { |v| v.is_a?(String) && v.strip.empty? ? nil : v }
  end

  def spot_json(spot)
    spot.as_json.merge(
      photo_url: spot.photo.attached? ? url_for(spot.photo) : nil
    )
  end
end
