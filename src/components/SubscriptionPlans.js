import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upgradePlan, downgradeToFree } from '../redux/subscriptionSlice';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

export default function SubscriptionPlans() {
  const dispatch = useDispatch();
  const { plan } = useSelector((state) => state.subscription);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      icon: Sparkles,
      features: [
        '10 facial analyses',
        'Basic recommendations',
        'Standard support',
        'Web access only',
      ],
      color: 'purple',
      value: 'free',
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'For regular users',
      icon: Zap,
      features: [
        '100 facial analyses',
        'Advanced recommendations',
        'Priority support',
        'API access',
        'Export reports',
        'Mobile app access',
      ],
      color: 'pink',
      value: 'pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For businesses & teams',
      icon: Crown,
      features: [
        'Unlimited analyses',
        'All Pro features',
        'Custom integrations',
        'Dedicated support',
        'Team management',
        'SLA guarantee',
      ],
      color: 'blue',
      value: 'enterprise',
    },
  ];

  const handleUpgrade = (planValue) => {
    if (planValue === 'free') {
      dispatch(downgradeToFree());
    } else {
      dispatch(upgradePlan(planValue));
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: 'border-purple-200 hover:border-purple-400 hover:shadow-purple-200',
      pink: 'border-pink-200 hover:border-pink-400 hover:shadow-pink-200',
      blue: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-200',
    };
    return colors[color];
  };

  const getButtonClasses = (color, isActive) => {
    const colors = {
      purple: isActive
        ? 'bg-purple-600 text-white'
        : 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      pink: isActive
        ? 'bg-pink-600 text-white'
        : 'bg-pink-50 text-pink-600 hover:bg-pink-100',
      blue: isActive
        ? 'bg-blue-600 text-white'
        : 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600">
            Choose the perfect plan for your beauty analysis needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((pricingPlan) => {
            const Icon = pricingPlan.icon;
            const isActive = plan === pricingPlan.value;

            return (
              <div
                key={pricingPlan.value}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all border-2 ${getColorClasses(
                  pricingPlan.color
                )} ${pricingPlan.popular ? 'md:scale-105 md:shadow-2xl' : ''}`}
              >
                {/* Popular Badge */}
                {pricingPlan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      pricingPlan.color === 'purple'
                        ? 'bg-purple-100'
                        : pricingPlan.color === 'pink'
                        ? 'bg-pink-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        pricingPlan.color === 'purple'
                          ? 'text-purple-600'
                          : pricingPlan.color === 'pink'
                          ? 'text-pink-600'
                          : 'text-blue-600'
                      }`}
                    />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pricingPlan.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">{pricingPlan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {pricingPlan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{pricingPlan.period}</span>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleUpgrade(pricingPlan.value)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors mb-8 ${getButtonClasses(
                      pricingPlan.color,
                      isActive
                    )}`}
                  >
                    {isActive ? '✓ Current Plan' : 'Choose Plan'}
                  </button>

                  {/* Features */}
                  <div className="space-y-3">
                    {pricingPlan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan?</h4>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm">
                Yes! Start with our Free plan with 10 analyses per month, no credit card required.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards and digital payment methods.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600 text-sm">
                We offer a 7-day money-back guarantee. Contact support if you're not satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
