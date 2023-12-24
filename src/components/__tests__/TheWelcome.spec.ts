import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheWelcome from '@/components/TheWelcome.vue'

describe('メール周り', () => {
  it('正しくメールチェックできているか', async () => {
    const wrapper = mount(TheWelcome)
    const email = 'test@example.com'
    const invalidEmail = 'invalid-email'

    const [emailInput, passwordInput] = wrapper.findAll('input')
    await emailInput.setValue(email)
    wrapper.vm.validateEmail()
    expect(wrapper.vm.emailError).toBe('')

    await emailInput.setValue(invalidEmail)
    wrapper.vm.validateEmail()
    expect(wrapper.vm.emailError).toBe('正しいメールアドレスを入力してください。')

    // DOM更新を待つ
    await wrapper.vm.$nextTick()
    expect(wrapper.text().includes('正しいメールアドレスを入力してください。')).toBe(true)
  })
})

describe('パスワード周り', () => {
  it('パスワードが正しくチェックされているか', async () => {
    const wrapper = mount(TheWelcome)
    const password = 'abc123'
    const invalidPassword = 'abc123!@#'

    const [emailInput, passwordInput] = wrapper.findAll('input')
    await passwordInput.setValue(password)
    wrapper.vm.validatePassword()
    expect(wrapper.vm.passwordError).toBe('')

    await passwordInput.setValue(invalidPassword)
    wrapper.vm.validatePassword()
    expect(wrapper.vm.passwordError).toBe('英数字のみ入力可能です。')

    // DOM更新を待つ
    await wrapper.vm.$nextTick()
    expect(wrapper.text().includes('英数字のみ入力可能です。')).toBe(true)
  })
})

describe('メールとパスワード両方', () => {
  it('メールとパスワード両方のチェック', async () => {
    const wrapper = mount(TheWelcome)

    // 正しいメールアドレスとパスワードをセット
    wrapper.vm.email = 'test@example.com'
    wrapper.vm.password = 'password123'
    expect(wrapper.vm.isFormValid).toBe(true)

    // DOM更新を待つ
    await wrapper.vm.$nextTick()
    const button = wrapper.find('button')
    expect(button.element.disabled).toBe(false)

    // 空文字でセット
    wrapper.vm.email = ''
    wrapper.vm.password = ''
    expect(wrapper.vm.isFormValid).toBe(false)

    // 正しくないメールアドレスとパスワードをセット
    wrapper.vm.emailError = 'Invalid email'
    wrapper.vm.passwordError = 'Invalid password'
    expect(wrapper.vm.isFormValid).toBe(false)

    // DOM更新を待つ
    await wrapper.vm.$nextTick()
    expect(button.element.disabled).toBe(true)
  })
})
