import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin, Github, MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';
import { EMAILJS_CONFIG } from '@/lib/emailjs';
import TiltCard from '@/components/3d/TiltCard';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        EMAILJS_CONFIG.publicKey
      );

      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you soon.",
      });

      // Reset form on success
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'manishmudhiraj1903@gmail.com',
      href: 'mailto:manishmudhiraj1903@gmail.com'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/kmanish1903',
      href: 'https://linkedin.com/in/kmanish1903'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/kmanish1903',
      href: 'https://github.com/kmanish1903'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Hyderabad, Telangana',
      href: null
    }
  ];

  return (
    <section id="contact" className="py-10 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a conversation about technology and development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Get in Touch</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                B.Tech CSE (AI & ML) graduate – 2026, seeking opportunities as a Full-Stack Developer (MERN). 
                Passionate about building scalable web applications and learning DevOps practices.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Open to projects, collaborations, and meaningful tech conversations.
              </p>
            </div>

            {/* Contact Details with 3D hover */}
            <div className="space-y-2.5">
              {contactInfo.map((contact, index) => (
                <TiltCard 
                  key={index} 
                  tiltAmount={3}
                  glareEnabled={false}
                  className="block"
                >
                  <div className="flex items-center space-x-4 p-2.5 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
                    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                      <contact.icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">{contact.label}</p>
                      {contact.href ? (
                        <a 
                          href={contact.href}
                          className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-smooth"
                          target={contact.href.startsWith('http') ? '_blank' : undefined}
                          rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground">{contact.value}</p>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4">
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="default" 
                  className="flex-1 h-10 border-primary text-primary hover:bg-primary hover:text-white interactive-button"
                  onClick={() => window.open('https://linkedin.com/in/kmanish1903', '_blank')}
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  size="default" 
                  className="flex-1 h-10 border-primary text-primary hover:bg-primary hover:text-white interactive-button"
                  onClick={() => window.open('https://github.com/kmanish1903', '_blank')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form with 3D effect */}
          <TiltCard tiltAmount={3} glareEnabled={true}>
            <Card className="gradient-card border-0 shadow-custom animate-scale-in">
              <CardHeader className="py-4">
                <CardTitle className="text-xl font-bold text-foreground">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="h-9 bg-background border-border focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="h-9 bg-background border-border focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-foreground mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={3.5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or just say hello..."
                      className="bg-background border-border focus:border-primary resize-none text-sm"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="default" 
                    disabled={isLoading}
                    className="w-full h-10 gradient-hero text-white shadow-glow interactive-button disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
