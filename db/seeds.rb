# Define the user_pictures array
user_pictures = []

6.times do
  user_pictures << URI.parse(Faker::LoremFlickr.image).open
end

me = User.find_or_create_by(email: "example@example.com") do |user|
  user.password = "password"
  user.build_profile(first_name: "John", last_name: "Smith")
end

# Attach the image correctly to the user's profile
me.profile.picture.attach(io: user_pictures[0], filename: "#{me.full_name}.jpg")

5.times do |i|
  user = User.create(email: Faker::Internet.email, password: "password")
  user.profile.update(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name)
  user.profile.picture.attach(io: user_pictures[i + 1], filename: "#{user.full_name}.jpg")
end

# Ensure 'me' user has an ID before proceeding
if me.persisted?
  10.times do |i|
    property = Property.create!(
      user: me,
      name: Faker::Lorem.word,
      headline: Faker::Lorem.sentence,
      description: Faker::Lorem.paragraphs(number: 30).join(" "),
      address_1: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      country_code: "US",
      price: Money.from_amount((25..100).to_a.sample)
    )

    property.images.attach(io: File.open(Rails.root.join("db", "sample", "images", "property_#{i + 1}.png")), filename: property.name)

    (1..5).to_a.sample.times do
      Review.create(reviewable: property, rating: (1..5).to_a.sample, title: Faker::Lorem.word, body: Faker::Lorem.paragraph, user: User.all.sample)
    end
  end
else
  puts "Error: 'me' user could not be created or found."
end
