class Api::ListingsController < ApplicationController
    def index
        bounds = params[:bounds]
        listings = bounds ? Listing.in_bounds(bounds) : Listing.all

        listings = listings.includes(:reviews, :host, :features)

        if params[:minPrice] && params[:maxPrice]
          price_range = (params[:minPrice]..params[:maxPrice])
          listings = listings.where(price: price_range)
        end

        if params[:listingId]
          listings = listings.where(id: params[:listingId])
        end
        
        @listings = listings
        render :index
    end

    def show
      @listing = Listing.find(params[:id])
    end

    def create
      #need to refactor if adding Host functionality
      @listing = Listing.create!(listing_params)
      render :show
    end

    private
  
    def listing_params
      params.require(:listing).permit(:id, :title, :description, :street_address, :city, :state, :zip_code, :country, :region, :lat, :lng, :currency, :price, :price_units, :additional_guest_charge, :max_guests, :num_bedrooms, :num_beds, :num_baths, :property_type, :type_of_place, :host_id, :is_posted, :other_fees, :other_fees_type, photos: [])
    end
  
end
