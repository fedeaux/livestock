require 'json'

deno = 11

widths = {}

deno.times do |i|
  widths["w-#{i+1}/#{deno}"] = { width: "#{((i+1.0)*10000.0/deno).to_i/100.0}%" }
end

puts JSON.pretty_generate widths
