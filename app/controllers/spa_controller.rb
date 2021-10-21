class SpaController < ApplicationController
  skip_forgery_protection

  def index
  end

  def clear_thief_chrome_extension

    # render json: { js: js }
    render json: { js: js }
  end

  def injector
    "(function(d, script) {
        script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.textContent = \"#{js}\";
        d.getElementsByTagName('head')[0].appendChild(script);
     }(document));"
  end

  def js
    File.read(Rails.root.join('app/javascript/packs/chrome_extensions/clear_thief.js')).gsub 'API_HOST', ENV['API_HOST']
  end

  def hahaha_nao_creio
    ap params
    head :ok
  end
end

  # console.log($('.AssetList[style="display: block;"] .AssetListItem input.stock_name.show').length);
  # console.log($('.AssetList[style="display: block;"] .AssetListItem .cont_list_one .container .value.show').length);
  # console.log($('.AssetList').length);
