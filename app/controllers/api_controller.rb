class ApiController < ApplicationController
  skip_forgery_protection
  before_action :set_query, only: [:show, :index]

  def query
    Braindamage::Query.from_json params[:query]
  end

  def set_query
    @query = query
  end
end
