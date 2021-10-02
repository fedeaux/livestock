class Simulators::InvestmentSimulator
  include ActionView::Helpers::NumberHelper

  def user
    @user ||= ensure_user
  end
end
