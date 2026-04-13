module AdminAuthenticated
  extend ActiveSupport::Concern

  included do
    before_action :require_admin
  end

  private

  def require_admin
    unless session[:admin_id] && Admin.exists?(session[:admin_id])
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
