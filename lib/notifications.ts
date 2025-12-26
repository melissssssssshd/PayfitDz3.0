/**
 * Notification Service
 * 
 * Gestion des notifications WhatsApp, Email et SMS pour le processus DZ
 */

export interface NotificationData {
    to: string
    type: "WHATSAPP" | "EMAIL" | "SMS"
    template: string
    data: Record<string, any>
    language?: "FR" | "AR"
}

export class NotificationService {
    /**
     * Envoie une notification (WhatsApp, Email ou SMS)
     */
    static async send(notification: NotificationData): Promise<boolean> {
        try {
            switch (notification.type) {
                case "WHATSAPP":
                    return await this.sendWhatsApp(notification)
                case "EMAIL":
                    return await this.sendEmail(notification)
                case "SMS":
                    return await this.sendSMS(notification)
                default:
                    return false
            }
        } catch (error) {
            console.error("Error sending notification:", error)
            return false
        }
    }

    /**
     * Envoie un message WhatsApp (via API WhatsApp Business)
     */
    private static async sendWhatsApp(notification: NotificationData): Promise<boolean> {
        // TODO: Intégrer avec WhatsApp Business API
        // Pour l'instant, on log juste
        console.log("WhatsApp notification:", {
            to: notification.to,
            template: notification.template,
            data: notification.data,
        })
        return true
    }

    /**
     * Envoie un email
     */
    private static async sendEmail(notification: NotificationData): Promise<boolean> {
        // TODO: Intégrer avec service d'email (Resend, SendGrid, etc.)
        console.log("Email notification:", {
            to: notification.to,
            template: notification.template,
            data: notification.data,
        })
        return true
    }

    /**
     * Envoie un SMS
     */
    private static async sendSMS(notification: NotificationData): Promise<boolean> {
        // TODO: Intégrer avec service SMS (Twilio, etc.)
        console.log("SMS notification:", {
            to: notification.to,
            template: notification.template,
            data: notification.data,
        })
        return true
    }

    /**
     * Envoie une confirmation de réception de demande de démo
     */
    static async sendDemoRequestConfirmation(
        email: string,
        phone: string,
        language: "FR" | "AR" = "FR",
        webinarLink?: string
    ): Promise<void> {
        const messages = {
            FR: {
                email: {
                    subject: "Votre demande de démo PayFit DZ",
                    body: webinarLink
                        ? `Merci pour votre demande ! Nous vous invitons à participer à notre webinar de démo : ${webinarLink}`
                        : "Merci pour votre demande ! Notre équipe vous contactera sous 24h.",
                },
                whatsapp: webinarLink
                    ? `Bonjour ! Merci pour votre demande de démo PayFit DZ. Rejoignez notre webinar : ${webinarLink}`
                    : "Bonjour ! Merci pour votre demande. Notre équipe vous contactera sous 24h.",
            },
            AR: {
                email: {
                    subject: "طلبك لعرض توضيحي PayFit DZ",
                    body: webinarLink
                        ? `شكرا لطلبك! ندعوك للمشاركة في ندوتنا: ${webinarLink}`
                        : "شكرا لطلبك! سيتصل بك فريقنا خلال 24 ساعة.",
                },
                whatsapp: webinarLink
                    ? `مرحبا! شكرا لطلبك لعرض توضيحي. انضم إلى ندوتنا: ${webinarLink}`
                    : "مرحبا! شكرا لطلبك. سيتصل بك فريقنا خلال 24 ساعة.",
            },
        }

        const langMessages = messages[language]

        // Envoyer email
        await this.send({
            to: email,
            type: "EMAIL",
            template: "demo_request_confirmation",
            data: langMessages.email,
            language,
        })

        // Envoyer WhatsApp si numéro fourni
        if (phone) {
            await this.send({
                to: phone,
                type: "WHATSAPP",
                template: "demo_request_confirmation",
                data: { message: langMessages.whatsapp },
                language,
            })
        }
    }

    /**
     * Envoie une invitation au webinar
     */
    static async sendWebinarInvitation(
        email: string,
        phone: string,
        webinarTitle: string,
        webinarDate: Date,
        meetingLink: string,
        language: "FR" | "AR" = "FR"
    ): Promise<void> {
        const messages = {
            FR: {
                email: {
                    subject: `Invitation webinar PayFit DZ : ${webinarTitle}`,
                    body: `Vous êtes invité à notre webinar le ${webinarDate.toLocaleDateString("fr-FR")}. Lien : ${meetingLink}`,
                },
                whatsapp: `Invitation webinar PayFit DZ : ${webinarTitle}\nDate : ${webinarDate.toLocaleDateString("fr-FR")}\nLien : ${meetingLink}`,
            },
            AR: {
                email: {
                    subject: `دعوة ندوة PayFit DZ: ${webinarTitle}`,
                    body: `أنت مدعو لندوتنا في ${webinarDate.toLocaleDateString("ar-DZ")}. الرابط: ${meetingLink}`,
                },
                whatsapp: `دعوة ندوة PayFit DZ: ${webinarTitle}\nالتاريخ: ${webinarDate.toLocaleDateString("ar-DZ")}\nالرابط: ${meetingLink}`,
            },
        }

        const langMessages = messages[language]

        await this.send({
            to: email,
            type: "EMAIL",
            template: "webinar_invitation",
            data: langMessages.email,
            language,
        })

        if (phone) {
            await this.send({
                to: phone,
                type: "WHATSAPP",
                template: "webinar_invitation",
                data: { message: langMessages.whatsapp },
                language,
            })
        }
    }
}


