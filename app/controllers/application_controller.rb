class ApplicationController < ActionController::API

    before_action :configure_permitted_parameters, if: :devise_controller?

    def current_user
        @current_user ||= User.find_by(id: session[:user_id])
      end
  
      def is_signed_in?
        if user_signed_in?
          render :json => {"signed_in" => true, "user" => current_user}.to_json()
        else
          render :json => {"signed_in" => false}.to_json()
        end
      end
  
      def require_login
        return head(:forbidden) unless logged_in?
      end

      def configure_permitted_parameters
        devise_parameter_sanitizer.for(:sign_up) << :name
        devise_parameter_sanitizer.for(:sign_up) << :provider
        devise_parameter_sanitizer.for(:sign_up) << :uid
      end
      
end
