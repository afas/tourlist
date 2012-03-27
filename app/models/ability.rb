class Ability
  include CanCan::Ability

  def initialize(current_user)
    current_user ||= User.new # guest user

    if current_user.email == 'fasexe@gmail.com'
      can :manage, :all
    else
      can :read, Country
      can :show, ChronopayLink
    end
  end
end
