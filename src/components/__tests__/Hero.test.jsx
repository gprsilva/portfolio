import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from '../Hero'

// Mock do scrollToSection
const mockScrollToSection = vi.fn()

describe('Hero Component', () => {
  it('should render hero content correctly', () => {
    render(<Hero />)
    
    // Verificar se o nome está presente
    expect(screen.getByText(/Guilherme Pereira/)).toBeInTheDocument()
    
    // Verificar se o subtítulo está presente
    expect(screen.getByText(/Desenvolvedor apaixonado por tecnologia/)).toBeInTheDocument()
    
    // Verificar se a descrição está presente
    expect(screen.getByText(/Especializado em Python/)).toBeInTheDocument()
  })

  it('should render action buttons', () => {
    render(<Hero />)
    
    // Verificar se os botões estão presentes
    expect(screen.getByRole('button', { name: /Ver Projetos/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Contato/i })).toBeInTheDocument()
  })

  it('should have correct button styles', () => {
    render(<Hero />)
    
    const projectsButton = screen.getByRole('button', { name: /Ver Projetos/i })
    const contactButton = screen.getByRole('button', { name: /Contato/i })
    
    // Verificar se os botões têm as classes corretas
    expect(projectsButton).toHaveClass('bg-gradient-to-r')
    expect(contactButton).toHaveClass('border-green-500')
  })

  it('should be accessible', () => {
    render(<Hero />)
    
    // Verificar se há um heading principal
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    
    // Verificar se os botões são focáveis
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('tabIndex', '0')
    })
  })
})
