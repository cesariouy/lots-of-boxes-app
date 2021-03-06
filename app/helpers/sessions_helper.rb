module SessionsHelper
  def current_user
    User.find_by_session_token(session[:session_token])
  end

  def current_user=(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout_current_user!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_current_user!
    if current_user.nil?
      respond_to do |format|
        format.html { redirect_to new_session_url }
        format.json { render json: {error: "You must be logged in"}, status: 422 }
      end
    end
  end

  def require_no_current_user!
    self.logout_current_user! unless current_user.nil?
  end
end
