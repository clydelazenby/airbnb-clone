require "rails_helper"

RSpec.describe "Profiles", type: :request do
  let(:user) { create(:user) }
  let(:profile) { user.profile }

  before { sign_in user }

  describe "GET show" do
    it "succeeds" do
      get profile_path(profile)
      expect(response).to be_successful
    end
  end
end
