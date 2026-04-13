class CreateParkingSpots < ActiveRecord::Migration[8.1]
  def change
    create_table :parking_spots do |t|
      t.decimal :lat, precision: 10, scale: 7
      t.decimal :lng, precision: 10, scale: 7
      t.boolean :paid
      t.string :hours
      t.text :description
      t.text :notes
      t.string :address
      t.string :submitter_name
      t.string :submitter_email
      t.integer :status

      t.timestamps
    end
  end
end
