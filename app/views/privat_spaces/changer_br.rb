dogovor_file_name = '_dogovor_text.html.erb'

content = ''
File.open(dogovor_file_name, 'r') do |f|
  while (line = f.gets)
    content << line.gsub(/\n/, "<br/>\n")
  end
end

File.open(dogovor_file_name, 'w') do |f|
  f.write(content)
end

puts "#{dogovor_file_name} successfully update"
