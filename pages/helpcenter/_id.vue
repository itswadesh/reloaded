<template>
  <div class="px-2 lg:px-64">
    <faq
      :back="true"
      :title="title"
      :questions="questions"
    />
  </div>
</template>

<script>
const faq = () => import("~/components/support/faq");
export default {
  data() {
    return {
      title: "",
      questions: [],
      titles: {
        "shipping-delivery": {
          title: "Shipping & Delivery",
          questions: [
            {
              question: "What is Cash on Delivery?",
              answer:
                "With an increasing number of online fraudulent activities that pose serious threats that create a gr owing hesitation to avoid advance online payments, Cash on Delivery is an easier and safer alternative to avoid the vulnerabilities of online payment methods. C-o-D will help pay the cash at the time of delivery of the product.",
              active: false
            },
            {
              question: "What are the delivery charges?",
              answer:
                "Delivery charge is the fee that has to be paid for the on-time delivery of a purchased product. Our standard shipping charges are Rs 150 but it keeps on changing based on the number of products purchased. For the best understanding please see the total shipping fee added to your order at checkout page.",
              active: false
            },
            {
              question: "How does the shipment/delivery process work?",
              answer:
                "Orders made on Litekart are delivered through reputed shipping partners. Buyers will be duly notified when the consignment is shipped. They will also be provided a tracking number to keep track of the orders.",
              active: false
            },
            {
              question: "What is the estimated time to deliver my order?",
              answer:
                "The approximate delivery time will depend on the following :" +
                '<ul style="margin-left: 40px"><li>Lahore , Karachi , Islamabad/Rawalpindi are usually delivered in 2-3 business days .</li><li>Delivery to other remote cities take 4-7 business Days.</li></ul>' +
                "However, our business days exclude public holidays and Sundays.",
              active: false
            },
            {
              question: "Does Litekart deliver internationally?",
              answer: "Not , we are not shipping outside Pakistan.",
              active: false
            },
            {
              question: "How can I keep track of the status of my orders?",
              answer:
                "The ‘My Account’ section in your litekart App will help review the status of your orders, so that you can receive relevant information based on the respective ‘Order Number’.",
              active: false
            },
            {
              question:
                "Will I get a confirmation call from Litekart after placing order? ",
              answer:
                "No we dont call customers for order confirmation. All new customers are logged in to litekart app via OTP(one time password) so we take this as order confirmation and ship you the order right away.",
              active: false
            },
            {
              question: "How do I contact Litekart’s customer care team?",
              answer:
                "No matter whether you have a question or a concern, we encourage you to reach out to our customer service team, by calling at +92 340 1111 340 or sending email to support@litekart.pk.",
              active: false
            }
          ]
        },
        "return-replacement": {
          title: "Return & Replacements",
          questions: [
            {
              question: "What is your return policy?",
              answer:
                "Any Product/item can be returned or exchanged if it is incorrect/ incomplete or defective/ damaged within 7 days after delivery.\n" +
                "\n" +
                "Litekart.pk reserves the right to reject a return request found misusing of our generous returns policy or a product received with missing tags and other components.",
              active: false
            },
            {
              question: "What are the conditions for return or exchange?",
              answer:
                "<ul style='margin-left: 40px'><li>The Product must be like in same condition as delivered, Unworn, unwashed and without any flaws.</li><li>The product must include the original tags, with original packaging.</li><li>Your item needs to have the receipt, order number or proof of purchase.</li></ul>",
              active: false
            },
            {
              question: "What is the procedure for Returns or Exchange?",
              answer:
                "You can return your product easily through litekart app in few seconds. Just follow these steps:<br>" +
                "<ul style='margin-left: 40px'><li>You can Sign in to your Litekart Account From  <a href='https://www.litekart.pk/login' style='color: #9b000a'>Here</a>.</li><li>Go to my order section.</li><li>Click on the View order for the specific order you want to place replacement/refund Request</li><li>Select refund/replace option from the top and then click one or all items that you want return or replaced.</li><li>Select the quantities and reason for replacement/refund</li><li>Click on the SAVE button to submit the request</li></ul>",
              active: false
            },
            {
              question: "What is the shipment method for return or exchange?",
              answer:
                "Once you have created your return request as described above, our customer care team will guide you to ship the product/item back to origin. Depending on the situation, you will either take your product / item to nearest drop-off point or wait for the collection by our pick-up service. Our pick-up service is only available in selected areas. It may take 3 – 4 working days for your return shipment to arrive on origin.",
              active: false
            },
            {
              question: "What is your refund or exhange policy?",
              answer:
                "Once we receive your item at origin, we will notify you on the status of your refund or exchange after inspecting the item. Although it depends on the criteria of product and your choice, the product is refundable or exchangeable.",
              active: false
            },
            {
              question: "When i'll be refunded?",
              answer:
                "Once your return is approved, we will initiate a refund to your preferred payment method within 48 hours.",
              active: false
            },
            {
              question: "When i'll  get my exchanged item?",
              answer:
                "Transit time for the Exchange shipment is same as our standard delivery time (3 to 5 Business days) from the time exchange is shipped. You will be entitled to get an exchange of an equal value as your original order.",
              active: false
            }
          ]
        },
        cancellations: {
          title: "Cancellations",
          questions: [
            {
              question: "How can I cancel my order?",
              answer:
                "In order to cancel your order, please login to litekart app in your my account section. Open the order you want to cancel and you will see an option to cancel the order. Your order can only be cancelled before it reaches the ‘Dispatched’ status in your my account on Litekart app.",
              active: false
            },
            {
              question:
                "Can I modify the shipping address of my order after it’s been placed?",
              answer:
                "You can cancel the order and reorder the same product by adding new address in your my-account section. However , if order is already in 'Dispatched' status you wont be able to change the current order.",
              active: false
            },
            {
              question:
                "I just cancelled my order. When will I receive my refund?",
              answer:
                "If you’ve selected Cash on Delivery, there’s no amount to be refunded because you haven't paid for your order. For payments made via Credit/Debit Card/Netbanking, you will receive your refund to the source account within 5-7 days from the time you cancel your order.",
              active: false
            },
            {
              question: "What is Litekart’s cancellation policy?",
              answer:
                "Only orders that haven't left the fulfilment centre can be cancelled.\n" +
                "If the order has already been shipped from our fulfilment centre, you can refuse to accept it and send it back with the courier.\n" +
                "In case you have paid using Netbanking/Debit/Credit Card, we’ll refund your order amount only after we’ve received the cancelled order at our fulfilment centre.",
              active: false
            }
          ]
        },
        "payments-refunds": {
          title: "Payments & Refunds",
          questions: [
            {
              question:
                "When can I expect the refund for the order I have returned the parcel?",
              answer:
                "It takes 4-7 business days for us to receive product back to our facility.\n  " +
                " After product is reached back to our facility we take another 2-3 days to refund the product amount back to you.\n",
              active: false
            },
            {
              question: "How would I be paid back as Refund ?",
              answer:
                "We would refund you either via bank transfer or using easypaisa.\n" +
                "<br><br>" +
                "In case of refund to your Credit/Debit/Net banking account, we take 3-5 business days from the date of receipt of the items.\n" +
                "<br><br>",
              active: false
            }
          ]
        },
        "bulk-orders-business-inquiry": {
          title: "Business Inquiry & Bulk Orders",
          questions: [
            {
              question: "I wish to become a seller on Litekart",
              answer:
                "<a href='/apply-for-vendor' style='color: #9b000a'>Fill this form</a> and  our team will reach you as soon as possible. ",
              active: false
            },
            {
              question: "I want to place a bulk order/I have a business query",
              answer:
                "Please email the details of the order you wish to place to support@litekart.pk with the subject line “Bulk order”.",
              active: false
            },
            {
              question: "How do I opt for franchise with Litekart",
              answer: "We currently do not provide this option ",
              active: false
            }
          ]
        },
        "account-settings": {
          title: "Account Settings",
          questions: [
            {
              question: "How can I create an account on Litekart?",
              answer:
                'First time shoppers can easily register with us by clicking on the ‘<a href="/account/signup" style="color: #9b000a">Register</a>’ link on our homepage. You will be asked to provide us with a few basic information, including your name, email address and contact details, along with a secure password. Make sure to fill in the mandatory details before submitting the form. After successful registration, you will receive an email containing your <a href="/account/login" style="color: #9b000a">login</a> details.' +
                "<br>Given below are a few points to remember while setting up an account on Litekart:<br>Add the current email address. This email address will be used to help retrieve your password, in-case you forget it. Your password must be a combination of alphanumeric characters, and should have a minimum of 5 characters, including a number and an alphabet. By creating a Litekart account you’re legally agreeing to our User Terms and Privacy Policy. Please be assured that we never share your personal information with any individual, group or company outside Litekart.",
              active: false
            },
            {
              question: "I can’t sign in to my account.",
              answer:
                "Go to <a href='/account/forgot-password?email=' style='color: #9b000a'>Reset password page</a>. Fill in your registered phone or email id and tap Rest Password. An otp will be sent to your medium either phone or email. Enter the otp and set a new password.",
              active: false
            },
            {
              question: "I want to change my account information.",
              answer:
                "To change your account information, please visit your <a href='/my/details' style='color: #9b000a'>account profile details</a>",
              active: false
            },
            {
              question: "I have an issue with my mobile app. What should I do?",
              answer:
                "Please email your registered email or phone and the issue you’re facing to support@litekart.pk with the subject line “Issue with the app”. We’ll get back to you within 24 hours.",
              active: false
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.scrollTo();
  },
  methods: {
    scrollTo() {
      window.scroll({
        behavior: "smooth",
        left: 0,
        top: 0
      });
    }
  },
  beforeMount() {
    this.title = this.titles[this.$route.params.id].title;
    this.questions = this.titles[this.$route.params.id].questions;
  },
  components: {
    faq
  },
  layout: "support",
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host;
    return {
      title: "Help & Support"
    };
  }
};
</script>

<style scoped>
.container {
  width: 70%;
}

@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
  }
}

@media only screen and (min-width: 600px) {
  .container {
    width: 100%;
  }
}

@media only screen and (min-width: 768px) {
  .container {
    width: 100%;
  }
}

@media only screen and (min-width: 992px) {
  .container {
    width: 80%;
  }
}

@media only screen and (min-width: 1200px) {
  .container {
    width: 70%;
  }
}
</style>
